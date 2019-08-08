/**
 *  @file サイト共通の設定
 */

const config = APP_CONFIG;

config.env = APP_ENV; // {dev, stg, prd}
config.imagesPath = `${config.path}assets/images/`;
// config.moviesPath = `${config.path}movies/`;
// config.dummyImagePath = `${config.path}dummy/images/`;

export default config;
