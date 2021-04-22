/*!
 * 消息提示
 */
import { Message } from 'element-ui';

export default {
    /**
     * 成功
     * @param {string} value 消息
     * @return {void}
     */
    success(msg) {
        Message(
            {
                showClose: true,
                message: msg,
                type: 'success'
            }
        );
    },
    /**
     * 警告
     * @param {string} value 消息
     * @return {void}
     */
    warning(msg) {
        Message(
            {
                showClose: true,
                message: msg,
                type: 'warning'
            }
        );
    },
    /**
     * 错误
     * @param {string} value 消息
     * @return {void}
     */
    error(msg) {
        Message(
            {
                showClose: true,
                message: msg,
                type: 'error'
            }
        );
    }
};