import Link from 'next/link';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layout';
import { Chip } from '../../components/ui';

// Creación de las columnas del DataGrid
const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'nombre', headerName: 'Nombre Completo', width: 300 },
	{
		field: 'paid',
		headerName: 'Pagada',
		description: 'Muestra información si esta pagada la orden o no',
		width: 200,
		renderCell: (params: GridRenderCellParams) => {
			return params.row.paid ? <Chip pagado /> : <Chip />;
		}
	},
	{
		field: 'orden',
		headerName: 'Orden',
		width: 200,
		renderCell: (params) => {
			return (
				<Link href={`/orders/${params.row.orderId}`} className='underline'>
					Ver Orden
				</Link>
			);
		},
		sortable: false
	}
];

// Forma statica de crear las filas del DataGrid
const rows = [
	{ id: 1, nombre: 'Ernesto Copca', paid: true, orderId: '638e5e9b807702b134875a41' },
	{ id: 2, nombre: 'Mónica Moreno', paid: false, orderId: '638e5e9b807702b134875b87' }
];

const PageHistory = () => {
	return (
		<ShopLayout
			title={'Historial de ordenes'}
			pageDescription={'Historial de ordenes del cliente'}
		>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Historial de ordenes</h1>

				<div className='h-[34rem] animate-fadeIn'>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</div>
			</div>
		</ShopLayout>
	);
};

export default PageHistory;
