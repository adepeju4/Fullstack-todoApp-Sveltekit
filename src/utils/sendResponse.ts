import { json } from '@sveltejs/kit';

export interface SvelteKitResponseParams {
    message?: string;
    data?: unknown;
    statusCode?: number;
    headers?: Record<string, string>;
}

export const sendSvelteKitResponse = ({
    data,
    message,
    statusCode = 200,
    headers = {},
}: SvelteKitResponseParams) => {
    const responseBody = {
        success: statusCode < 400,
        message,
        data,
    };

    if (message === 'Logged out') {
        headers['Set-Cookie'] = 'TDtoken=; Max-Age=0; HttpOnly; Path=/;';
    }



    return json(responseBody, { status: statusCode, headers });
};


