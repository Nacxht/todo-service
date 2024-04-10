export interface ErrorResponseSchema {
	status: boolean | null;
	statusCode: number | null;
	error: { name: any; path: any; message: any };
}
