import { fetchGet,fetchPost } from '../utils/request.js'


/**
 * 首页热门评论
 */
export function getQueryHotComment (data) {
  return fetchGet('/api/HotType/QueryHotComment',data)
};
/**
 * 首页热门分类
 */
export function getQueryHotType (data) {
  return fetchGet('/api/HotType/QueryHotType',data)
};
/**
 * 搜索
 */
export function querySearch (data) {
  return fetchGet('/api/HotType/Seach',data)
};
/**
 * 评论点赞
 */
export function fabulous (data) {
  return fetchGet('/api/HotType/ClickLikes',data)
};
/**
 * 产品点赞
 */
export function ProductLikes (data) {
  return fetchGet('/api/HotType/ProductLikes',data)
};
/**
 * 投票
 */
export function vote (data) {
  return fetchGet('/api/HotType/VoteClick',data)
};
/**
 * 发布评论
 */
export function addCommentInfo (data) {
  return fetchPost('/api/HotType/AddCommentInfo',data)
};
/**
 * 产品详情
 */
export function getProcessDetails (data) {
  return fetchGet('/api/HotType/QueryDetails',data)
};
/**
 * 产品评论
 */
export function getQueryProductComment (data) {
  return fetchGet('/api/HotType/QueryProductComment',data)
};
/**
 * 分类列表
 */
export function getTypeList () {
  return fetchGet('api/HotType/TypeList')
};
/**
 * 根据类型id查询产品
 */
export function getTypeToProduct (data) {
  return fetchGet('api/HotType/TypeToProduct',data)
};
/**
 * 产品比较
 */
export function compareToProduct (data) {
  return fetchPost('/api/HotType/CompareToProduct',data)
};