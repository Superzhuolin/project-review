//数据存储的工具箱     存取/删除值
/* Storag封装 */
const STORAGE_KEY = 'mall';
export default {
    // 存储值
    setItem(key, value, module_name) {
        if (module_name) {
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name, val);
        } else {
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
        }
    },
    // 获取某一个模块下面的属性user下面的userName
    getItem(key, module_name) {
        // 带module_name情况
        if (module_name) {
            let val = this.getItem(module_name);
            if (val) return val[key];
        }
        return this.getStorage()[key];
    },//获取整个数据
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
    },//清空值
    clear(key, module_name) {
        let val = this.getStorage();
        if (module_name) {
            if (!val[module_name]) return;
            delete val[module_name][key];
        } else {
            delete val[key]; 
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
        //     if (!val[module_name]) return;
        //     delete val[module_name][key];
        // } else {
        //     delete val[key];
        // }
        // {"user":{"userName":"jack","age":30,"sex":1}}
    }
}