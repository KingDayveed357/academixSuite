import { DataTable } from '@/components/financial/DataTable'

export function ReconciliationView({ rows }: { rows: Array<{ fee: string; expected: number; actual: number; status: string }> }) {
  return <DataTable columns={[{ key: 'fee', label: 'Fee' }, { key: 'expected', label: 'Expected', align: 'right' }, { key: 'actual', label: 'Actual', align: 'right' }, { key: 'status', label: 'Status' }]} data={rows} />
}
