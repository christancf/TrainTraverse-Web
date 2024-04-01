import { Badge, Table } from 'flowbite-react'
import { getStatusBadgeColor } from '../utils/colorHelper'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

const CommonTable = ({ tableHeadings, tableData, onClick }) => {
  const getTableCell = (key, value, dataItem) => {
    switch (key) {
      case 'status':
        return (
          <Table.Cell key={key}>
            <Badge
              color={getStatusBadgeColor(value)}
              size="sm"
              className="w-max rounded-lg cursor-pointer"
            >
              {value ?? ''}
            </Badge>
          </Table.Cell>
        )

      case 'actions':
        return (
          <Table.Cell key={key}>
            <PencilSquareIcon
              className="h-5 w-5 text-amber-500 ml-4 cursor-pointer"
              onClick={() => onClick(dataItem)}
            />
          </Table.Cell>
        )
      case 'schedules':
        return
      default:
        return <Table.Cell key={key}>{value ?? ''}</Table.Cell>
    }
  }
  if (tableData === null) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  } else {
    return (
      <Table hoverable>
        <Table.Head>
          {tableHeadings.map(heading => (
            <Table.HeadCell key={heading.id}>{heading.name}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {tableData.map(dataItem => (
            <Table.Row key={dataItem.id}>
              {Object.entries(dataItem).map(([key, value]) =>
                getTableCell(key, value),
              )}
              {getTableCell('actions', 's', dataItem)}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export default CommonTable
