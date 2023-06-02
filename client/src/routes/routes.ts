import axios from 'axios';
import { TimeEntryModel } from '../common/TimeEntryModel';

const VITE_SERVER_HOSTNAME = import.meta.env.VITE_SERVER_HOSTNAME;
const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const API_PATH = VITE_SERVER_HOSTNAME + ':' + VITE_SERVER_PORT + API_ENDPOINT;

export async function getEntries() {
	try {
		const res = await axios.get(API_PATH);
		return res.data;
	} catch (err) {
		console.log('error:', err);
		return 'error';
	}
}
export async function getEntryById(id: string): Promise<string | string[]> {
	try {
		const res = await axios.get(API_PATH + `/${id}`);
		return res.data as string[];
	} catch (err) {
		console.log('error:', err);
		return 'error';
	}
}
export async function createEntry(data: TimeEntryModel): Promise<string> {
	try {
		const res = await axios.post(API_PATH, data);
		return res.data as string;
	} catch (err) {
		console.log('error:', err);
		return 'error';
	}
}
export async function deleteEntry(id: string): Promise<string> {
	try {
		console.log(id);
		const res = await axios.delete(API_PATH + `/${id}`);
		return res.data as string;
	} catch (err) {
		console.log('error:', err);
		return 'error';
	}
}
export async function updateEntry(id: string, data: TimeEntryModel): Promise<string> {
	try {
		const res = await axios.put(API_PATH + `/${id}`, data);
		return res.data as string;
	} catch (err) {
		console.log('error:', err);
		return 'error';
	}
}
