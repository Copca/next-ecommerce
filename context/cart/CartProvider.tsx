import { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { clienteAxios } from '../../axios';
import { ICartProduct, IOrder, IShippingAddress } from '../../interfaces';

import { CartContext, cartReducer } from './';

export interface CartState {
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;

	shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
	isLoaded: false,
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
	shippingAddress: undefined
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
	const [isMounted, setIsMounted] = useState(false);

	// Guardamos en el State los productos almacenados en Cookies al cargar el componente
	useEffect(() => {
		if (!isMounted) {
			// usando el trycatch prevenimos un error si modifican las cookies en en navegador
			try {
				const cookieProducts = JSON.parse(Cookies.get('cart') ?? '[]');

				dispatch({
					type: '[Cart] - Load Cart from Cookies | storage',
					payload: cookieProducts
				});
			} catch (error) {
				dispatch({
					type: '[Cart] - Load Cart from Cookies | storage',
					payload: []
				});
			}
		}

		setIsMounted(true);
	}, [isMounted]);

	// Ya que el componente esta montado almacenamos cualquier cambio del carrito en las cookies
	useEffect(() => {
		if (isMounted) {
			Cookies.set('cart', JSON.stringify(state.cart));
		}
	}, [state.cart, isMounted]);

	//  Guardamos en el State los datos de ShippingAddress almacenados en Cookies cuando se recarga el componente
	useEffect(() => {
		if (Cookies.get('firstName')) {
			const address = {
				firstName: Cookies.get('firstName') ?? '',
				lastName: Cookies.get('lastName') ?? '',
				address: Cookies.get('address') ?? '',
				address2: Cookies.get('address2') ?? '',
				zip: Cookies.get('zip') ?? '',
				city: Cookies.get('city') ?? '',
				country: Cookies.get('country') ?? '',
				phone: Cookies.get('phone') ?? ''
			};

			dispatch({ type: '[Cart] - Load Address from Cookies', payload: address });
		}
	}, []);

	// Calular el total de articulos en carrito y subtotal del costo para el resumen de la orden
	useEffect(() => {
		// Cantidad de articulos
		const numberOfItems = state.cart.reduce(
			(prev, current) => current.quantity + prev,
			0
		);

		// Subtotal
		const subTotal = state.cart.reduce(
			(prev, current) => current.price * current.quantity + prev,
			0
		);

		// Impuestos 15%
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

		const orderSummary = {
			numberOfItems,
			subTotal,
			tax: subTotal * taxRate,
			total: subTotal + subTotal * taxRate
		};

		dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
	}, [state.cart]);

	// Agregar productos al carrito
	const addProduct = (product: ICartProduct) => {
		// Solo agrega el producto si el ID aún no esta en el carrito
		const productInCart = state.cart.some(
			(productState) => productState._id === product._id // true o false
		);

		if (!productInCart) {
			return dispatch({
				type: '[Cart] - Update Products in Cart',
				payload: [...state.cart, product]
			});
		}

		// Agrega producto al carrito con diferente talla
		const productInCartButDifferentSize = state.cart.some(
			(productState) =>
				productState._id === product._id && productState.size === product.size
			// true -> mismo producto misma talla
			// false -> mismo producto diferente talla
		);

		// Mismo producto diferente talla
		if (!productInCartButDifferentSize) {
			return dispatch({
				type: '[Cart] - Update Products in Cart',
				payload: [...state.cart, product]
			});
		}

		// Si el producto ya esta en el carrito y se selecciona otro igual (talla) se actualiza la cantidad
		const updatedProducts = state.cart.map((productState) => {
			if (productState._id !== product._id) return productState;
			if (productState.size !== product.size) return productState;

			// Actualizar la cantidad
			productState.quantity += product.quantity;

			return productState;
		});

		dispatch({ type: '[Cart] - Update Products in Cart', payload: updatedProducts });
	};

	// Cambiar cantidades del producto
	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Change Cart quantity', payload: product });
	};

	// Quitar productos del carrito
	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Remove product in cart', payload: product });
	};

	// Guardamos la direccion de envio en Cookies y en el State
	const updateShippingAddress = (address: IShippingAddress) => {
		Cookies.set('firstName', address.firstName);
		Cookies.set('lastName', address.lastName);
		Cookies.set('address', address.address);
		Cookies.set('address2', address.address2 || '');
		Cookies.set('zip', address.zip);
		Cookies.set('city', address.city);
		Cookies.set('country', address.country);
		Cookies.set('phone', address.phone);

		dispatch({ type: '[Cart] - Update ShippingAddress', payload: address });
	};

	//? Revisar
	const createOrder = async (): Promise<{
		hasError: boolean;
		message: string;
		idOrder?: string;
	}> => {
		if (!state.shippingAddress) {
			throw new Error('No hay dirección de entrega');
		}

		// Almacenamos en "body": IOrder los datos obligatorios de CartState
		const body: IOrder = {
			// hacemos este map por que size es obligatorio en IOrder y es opcional en el state.cart:ICartProduct[]l
			orderItems: state.cart.map((p) => ({
				...p,
				size: p.size!
			})),
			shippingAddress: state.shippingAddress,
			numberOfItems: state.numberOfItems,
			subTotal: state.subTotal,
			tax: state.tax,
			total: state.total,
			isPaid: false
		};

		try {
			const { data } = await clienteAxios.post<IOrder>('/orders', body);

			// Reseteamos el cart(cookies)
			dispatch({ type: '[Cart] - Order Complete' });

			return {
				hasError: false,
				message: 'Order creada',
				idOrder: data._id
			};
		} catch (error) {
			// console.log(error);

			if (axios.isAxiosError(error)) {
				return {
					hasError: true,
					message: error.response?.data.message
				};
			}

			return {
				hasError: true,
				message: 'Error no controlado, hable con el administrador'
			};
		}
	};

	return (
		<CartContext.Provider
			value={{
				// State
				...state,

				// Metodos
				addProduct,
				updateCartQuantity,
				removeCartProduct,
				updateShippingAddress,
				createOrder
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
