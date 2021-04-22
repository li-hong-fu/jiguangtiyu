export default {
    /**
     * 处理表格
     * @param {Array} list 表格数组
     */
    getTreeToArray(list) {
        let tmp = [];
        list.forEach(data => {
            if (data.type == 1) {
                data.children = [];
                tmp.push(data);
            }

            tmp.forEach((arr, index) => {
                if (arr.id == data.pid) {
                    data.children = [];
                    tmp[index].children.push(data)
                }

                arr.children.forEach((Array, indexs) => {
                    if (Array.id == data.pid) {
                        tmp[index].children[indexs].children.push(data)
                    }
                })
            })
        })

        return tmp

    }
}