export default interface Order {
	'id'?: number,
	'order-type': string,
	'order-performer': string,
	'order-item-number': string,
	'order-comment-of-user': string,
	'order-wizard-instructions': string,
	'order-status': number
}