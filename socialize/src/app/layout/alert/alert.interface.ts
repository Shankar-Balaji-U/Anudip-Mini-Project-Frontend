import { AlertType } from './alert.enum';

export interface AlertInterface {
	type: AlertType;
	text: string;
}