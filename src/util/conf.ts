/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Conf
 */

export const pageLimit: number = 20;

export type BrontosaurusConfig = {

    database: string;
};

export const readConfigEnvironment = (): BrontosaurusConfig => {

    const database: string | undefined = process.env.BRONTOSAURUS_DB || process.env.BRONTOSAURUS_DATABASE;

    if (database) {
        return {
            database,
        };
    }

    console.log('Environment variable not found');
    process.exit();

    throw new Error('never');
};

export const getEnvGettingText = () => {

    return `<script>if(!window.env){window.env={}};window.env.PORTAL_PATH="${process.env.PORTAL_PATH}"</script>`;
};

export const isDevelopment = (): boolean => process.env.NODE_ENV === 'development';
