/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Conf
 */

export const pageLimit: number = 20;

export const getEnvGettingText = () => {

    return `<script>if(!window.env){window.env={}};window.env.PORTAL_PATH="${process.env.PORTAL_PATH}"</script>`;
};

export const isDevelopment = (): boolean => process.env.NODE_ENV === 'development';
