<?php

namespace Tests\Unit;

use App\Models\School;
use App\Services\Tenancy\TenantResolver;
use App\Support\Tenancy\TenantContext;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class TenantResolverTest extends TestCase
{
    use RefreshDatabase;

    private TenantResolver $resolver;
    private TenantContext $context;

    protected function setUp(): void
    {
        parent::setUp();
        $this->context = new TenantContext();
        $this->resolver = new TenantResolver($this->context);
    }

    public function test_it_resolves_from_subdomain(): void
    {
        $school = School::factory()->create(['slug' => 'test-school']);
        
        $request = Request::create('http://test-school.academixsuite.com');
        
        $resolved = $this->resolver->resolve($request);

        $this->assertNotNull($resolved);
        $this->assertEquals($school->id, $resolved->id);
        $this->assertEquals($school->id, $this->context->id());
    }

    public function test_it_resolves_from_path(): void
    {
        $school = School::factory()->create(['slug' => 'test-school']);
        
        $request = Request::create('http://academixsuite.com/access/test-school/dashboard');
        
        $resolved = $this->resolver->resolve($request);

        $this->assertNotNull($resolved);
        $this->assertEquals($school->id, $resolved->id);
        $this->assertEquals($school->id, $this->context->id());
    }

    public function test_it_resolves_from_session(): void
    {
        $school = School::factory()->create();
        
        $request = Request::create('http://academixsuite.com/dashboard');
        $request->setLaravelSession(session());
        $request->session()->put('active_tenant_id', $school->id);
        
        $resolved = $this->resolver->resolve($request);

        $this->assertNotNull($resolved);
        $this->assertEquals($school->id, $resolved->id);
    }

    public function test_it_returns_null_for_invalid_slug(): void
    {
        $request = Request::create('http://invalid.academixsuite.com');
        
        $resolved = $this->resolver->resolve($request);

        $this->assertNull($resolved);
        $this->assertFalse($this->context->hasTenant());
    }
}
