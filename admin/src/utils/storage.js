/*!
 * 本地存储
 */
export default {
    /**
     * 写入Storage
     * @param {string} key 值名称
     * @param {string} value 值
     * @return {void}
     */
    set(key, value) {
        localStorage.setItem(key, value);
    },
    /**
     * 获取Storage
     * @param {string} key 值名称
     * @return {string}
     */
    get(key) {
        return localStorage.getItem(key);
    },
    /**
     * 删除Storage
     * @param {string} key 值名称
     * @return {void}
     */
    remove(key) {
        localStorage.removeItem(key);
    }
};