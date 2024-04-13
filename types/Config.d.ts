export interface Config {
	server: {
		port: number;
		secret: string;
		env: string;
		url: string;
	};
	mongo: {
		url: string;
	};
}
