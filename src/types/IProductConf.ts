import type { IProduct } from './IProduct'

export type Code = 'color' | 'size'
type ColorLabel = 'Red' | 'Blue' | 'Black'
export type ColorValue = '#ff0000' | '#0000ff' | '#000'
type SizeLabel = 'M' | 'L'
type SizeValue = 1 | 2

export interface IConfigurableOptionColor {
	label: ColorLabel
	value_index: number
	value: ColorValue
}
export interface IConfigurableOptionSize {
	label: SizeLabel
	value_index: number
	value: SizeValue
}
interface IConfigurableOption {
	attribute_id: number
	attribute_code: Code
	label: 'Color' | 'Size'
	values: (IConfigurableOptionColor | IConfigurableOptionSize)[]
}

interface IVariant {
	attributes: {
		code: Code
		value_index: number
	}[]
	product: Pick<IProduct, 'id' | 'sku' | 'image'>
}

export interface IProductConf extends IProduct {
	configurable_options: IConfigurableOption[]
	variants: IVariant[]
	color?: string
	size?: string
}
