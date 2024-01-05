const lcp = (function () {
    //初始化虚拟id列表，Lcp实例的容器
    window.$lcpid = window.$lcpid instanceof Array ? window.$lcpid : [];
    const exclude = ["tag", "$rely", "class", "style", "text", "children", "$lcpid", "css", "$el", "for", "$for", "show", "if", "$index", "$css", "$key", "$index_", "$value", "$forList", "$state", "$defer", "$other"];
    
    Object.prototype.text_ = function (text) {
        this.text = text;
        return this;
    }
    Object.prototype.children_ = function (arr) {
        this.children = arr;
        return this;
    }
    Object.prototype.class_ = function (any) {
        this.class = any;
        return this;
    }
    Object.prototype.style_ = function (any) {
        this.style = any;
        return this;
    }
    Object.prototype.for_ = function (any) {
        this.for = any;
        return this;
    }
    Object.prototype.$index_ = function (text) {
        this.$index = text;
        return this;
    }
    Object.prototype.$key_ = function (text) {
        this.$key = text;
        return this;
    }
    Object.prototype.$value_ = function (text) {
        this.$value = text;
        return this;
    }
    Object.prototype.$other_ = function (obj) {
        let key_ = Object.keys(obj);
        for (let i = 0; i < key_.length; i++) {
            this[key_[i]] = obj[key_[i]];
        }
        return this;
    }
    Object.defineProperty(Object.prototype, "text_", {
        enumerable: false
    });
    Object.defineProperty(Object.prototype, "children_", {
        enumerable: false
    });
    Object.defineProperty(Object.prototype, "class_", {
        enumerable: false
    });
    Object.defineProperty(Object.prototype, "style_", {
        enumerable: false
    });
    Object.defineProperty(Object.prototype, "for_", {
        enumerable: false
    });
    Object.defineProperty(Object.prototype, "$index_", {
        enumerable: false
    });
    Object.defineProperty(Object.prototype, "$key_", {
        enumerable: false
    });
    Object.defineProperty(Object.prototype, "$value_", {
        enumerable: false
    });
    Object.defineProperty(Object.prototype, "$other_", {
        enumerable: false
    });
    
    //临时的解析方法
    function $parse(str, obj) {
        let arr = Object.keys(obj);
        let arrs = [];
        for (let i = 0; i < arr.length; i++) {
            arrs.push(obj[arr[i]]);
        }
        return new Function(...arr, 'return ' + str)(...arrs);
    }
    //管理真实数据的映射
    let treesRealData = {};
    //方法树
    const tree = {
        //这个方法用于新增子元素

        createTrunk(description, treex, index_, el, defer = false) {
            //自身
            const trees = description;
            //元素的状态管理
            trees.$state = {};
            trees.$defer = defer;
            trees.$other = {};
            trees.$rely = false;
            //不允许传其他类型数据
            if (trees instanceof Object) {
                //将其他属性进行一个初始化
                let key_ = Object.keys(trees);
                for (let k = 0; k < key_.length; k++) {
                    if (!exclude.includes(key_[k])) {
                        trees.$other[key_[k]] = trees[key_[k]];
                    }
                }
                //绑定虚拟id
                trees.$lcpid = treex.$lcpid + '-' + index_;
                const forbear = tree.forbear(trees.$lcpid);
                trees.$index_ = index_;
                treesRealData[trees.$lcpid] = [];
                let show_if = trees.hasOwnProperty("show");
                let if_if = trees.hasOwnProperty("if");
                let class_isArr = trees.class instanceof Array;
                let class_isObj = trees.class instanceof Object;
                let style_isObj = trees.style instanceof Object;
                let style_isArr = trees.style instanceof Array;
                let style_obj, class_obj, other_obj;
                if (style_isObj) {
                    style_obj = Object.keys(trees.style);
                }
                if (class_isObj) {
                    class_obj = Object.keys(trees.class);
                }
                if (trees.$other) {
                    other_obj = Object.keys(trees.$other);
                }
                let state = {
                    show_if: show_if,
                    if_if: if_if,
                    class_isArr: class_isArr,
                    class_isObj: class_isObj,
                    style_isArr: style_isArr,
                    style_isObj: style_isObj,
                    style_obj: style_obj,
                    class_obj: class_obj,
                    other_obj: other_obj
                };
                if (trees.css) {
                    let style = document.createElement("style");
                    let text = trees.css.replace(/\{lcpid\}/g, "*[v-lcpid='" + trees.$lcpid + "']");
                    style.textContent = text;
                    trees.$css = style;
                    document.head.appendChild(style);
                }
                //祖元素和自身都不是列表循环
                if (!trees.for && !treex.$for) {
                    //根据描述的标签名来创建元素
                    let data = {};
                    if(forbear.data){
                    let key_ = Object.keys(forbear.data);
                    for (let i = 0; i < key_.length; i++) {
                        data[key_[i]] = forbear.data[key_[i]]
                    }
                }
                    let tag = tree.render(trees, 0, state, data);
                    if (tag) {
                        if (!defer) {
                            if (el) {
                                //插入兄弟元素
                                let els = trees.elementFindNext(0, el, 0);
                                treex.$el.insertBefore(tag, els);
                            } else {
                                //插入子元素
                                treex.$el.appendChild(tag);
                            }
                        }
                    }
                }

                //父元素或祖元素是列表渲染               
                if (treex.$for) {
                    trees.$forList = {};
                    //自定义的value、key、index的值
                    let valuex_ = "value";
                    let keyx_ = "key";
                    let indexx_ = "index";
                    trees.$el = [];
                    //对祖父与父都是列表渲染情况下，处理细节
                    //对css属性进行处理，创建对应的style到head标签
                    
                    //当父元素是列表循环时
                    let manage = {};
                    let manage_ = {};
                    let managex = {};
                    trees.$state.if = [];
                    trees.$state.parent = [];
                    let objx = {};
                    let arrx = [];
                    let data = {};
                    if(forbear.data){
                    let key_ = Object.keys(forbear.data);
                    for (let i = 0; i < key_.length; i++) {
                        data[key_[i]] = forbear.data[key_[i]]
                    }
                }
                    for (let i = 0; i < treex.$el.length; i++) {
                        //将元素的数据与列表渲染关键词绑定
                        tree.reality(treex, arrx, manage, manage_, objx, managex, data);
                        //自身也是列表循环
                        if (trees.for) {
                            //绑定自身为列表数据来源
                            trees.$for = trees.$lcpid;
                            //对自身的所有el进行遍历并插到父元素
                            //判断列表渲染源是数组还是对象还是字符串
                            //渲染源为数组时
                            if (trees.for instanceof Array) {
                                let frag = document.createDocumentFragment();
                                if (trees.$value) {
                                    valuex_ = trees.$value;
                                }
                                if (trees.$index) {
                                    indexx_ = trees.$index;
                                }
                                forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                                forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                                for (let j = 0; j < trees.for.length; j++) {
                                    data[valuex_] = trees.for[j];
                                    data[indexx_] = j;
                                    let tag = tree.render(trees, i, state, data);
                                    if (tag) {
                                        frag.appendChild(tag);
                                    }
                                }
                                if (!defer) {
                                    if (el) {
                                        let next = tree.elementFindNext(i, el, 0);
                                        if (next) {
                                            treex.$el[i].insertBefore(frag, next);
                                        } else {
                                            treex.$el[i].appendChild(frag);
                                        }
                                    } else {
                                        treex.$el[i].appendChild(frag);
                                    }
                                }
                            }

                            //渲染源为对象时
                            else if (trees.for instanceof Object) {
                                let frag = document.createDocumentFragment();
                                if (trees.$value) {
                                    valuex_ = trees.$value;
                                }
                                if (trees.$index) {
                                    indexx_ = trees.$index;
                                }
                                if (trees.$key) {
                                    keyx_ = trees.$key;
                                }

                                forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                                forbear.forKeyList['key'][trees.$lcpid] = keyx_;
                                forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                                let key_ = Object.keys(trees.for);
                                for (let j = 0; j < key_.length; j++) {

                                    data[valuex_] = trees.for[key_[j]];
                                    data[indexx_] = j;
                                    data[keyx_] = key_[j];

                                    let tag = tree.render(trees, i, state, data);
                                    if (tag) {
                                        frag.appendChild(tag);
                                    }

                                }
                                if (!defer) {
                                    if (el) {
                                        let next = tree.elementFindNext(i, el, 0);
                                        if (next) {
                                            treex.$el[i].insertBefore(frag, next);
                                        } else {
                                            treex.$el[i].appendChild(frag);
                                        }
                                    } else {
                                        treex.$el[i].appendChild(frag);
                                    }
                                }
                            }

                            //当渲染源是字符串时
                            else if (typeof (trees.for) === "string") {
                                //取真实渲染源
                                let render = tree.textParse(trees.for, false, data);
                                //判断真实渲染源是数组还是对象还是字符串
                                //渲染源为数组时
                                if (render instanceof Array) {
                                    let frag = document.createDocumentFragment();
                                    if (trees.$value) {
                                        valuex_ = trees.$value;
                                    }
                                    if (trees.$index) {
                                        indexx_ = trees.$index;
                                    }

                                    forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                                    forbear.forKeyList['index'][trees.$lcpid] = indexx_;

                                    for (let j = 0; j < render.length; j++) {

                                        data[valuex_] = render[j];
                                        data[indexx_] = j;
                                        let tag = tree.render(trees, i, state, data);
                                        if (tag) {
                                            frag.appendChild(tag);
                                        }
                                    }
                                    if (!defer) {
                                        if (el) {
                                            let next = tree.elementFindNext(i, el, 0);
                                            if (next) {
                                                treex.$el[i].insertBefore(frag, next);
                                            } else {
                                                treex.$el[i].appendChild(frag);
                                            }
                                        } else {
                                            treex.$el[i].appendChild(frag);
                                        }
                                    }
                                }

                                //渲染源为对象时
                                else if (render instanceof Object) {
                                    let frag = document.createDocumentFragment();
                                    if (trees.$value) {
                                        valuex_ = trees.$value;
                                    }
                                    if (trees.$index) {
                                        indexx_ = trees.$index;
                                    }
                                    if (trees.$key) {
                                        keyx_ = trees.$key;
                                    }
                                    forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                                    forbear.forKeyList['key'][trees.$lcpid] = keyx_;
                                    forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                                    let key_ = Object.keys(render);
                                    for (let j = 0; j < key_.length; j++) {

                                        data[valuex_] = render[key_[j]];
                                        data[indexx_] = j;
                                        data[keyx_] = key_[j];

                                        let tag = tree.render(trees, i, state, data);
                                        if (tag) {
                                            frag.appendChild(tag);
                                        }

                                    }
                                    if (!defer) {
                                        if (el) {
                                            let next = tree.elementFindNext(i, el, 0);
                                            if (next) {
                                                treex.$el[i].insertBefore(tag, next);
                                            } else {
                                                treex.$el[i].appendChild(tag);
                                            }
                                        } else {
                                            treex.$el[i].appendChild(tag);
                                        }
                                    }
                                }

                                //渲染源为字符串时
                                else if (typeof (render) === "string") {

                                    if (trees.$value) {
                                        valuex_ = trees.$value;
                                    }
                                    if (trees.$index) {
                                        indexx_ = trees.$index;
                                    }
                                    data[valuex_] = render;
                                    data[indexx_] = 0;

                                    let tag = tree.render(trees, i, state, data);

                                    forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                                    forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                                    if (tag) {
                                        if (!defer) {
                                            if (el) {
                                                let next = tree.elementFindNext(i, el, 0);
                                                if (next) {
                                                    treex.$el[i].insertBefore(tag, next);
                                                } else {
                                                    treex.$el[i].appendChild(tag);
                                                }
                                            } else {
                                                treex.$el[i].appendChild(tag);
                                            }
                                        }
                                    }

                                }


                            }


                        }

                        //自身不是列表循环
                        else {
                            //绑定父元素为列表数据来源
                            trees.$for = treex.$lcpid;
                            let tag = tree.render(trees, i, state, data);
                            if (tag) {
                                if (!defer) {
                                    if (el) {
                                        let next = tree.elementFindNext(i, el, 0);
                                        if (next) {
                                            treex.$el[i].insertBefore(tag, next);
                                        } else {
                                            treex.$el[i].appendChild(tag);
                                        }
                                    } else {
                                        treex.$el[i].appendChild(tag);
                                    }
                                }
                            }

                        }


                    }

                    tree.treesFindFor(trees);

                }

                //父元素不是列表渲染时   
                if (!treex.$for) {
                    //自身是列表渲染
                    if (trees.for) {
                        trees.$forList = {};
                        //自定义的value、key、index的值
                        let valuex_ = "value";
                        let keyx_ = "key";
                        let indexx_ = "index";
                        
                        //将自身绑定为列表数据来源
                        trees.$for = trees.$lcpid;
                        trees.$el = [];
                        trees.$state.if = [];
                        trees.$state.parent = [];
                        let data = {};
                        if(forbear.data){
                        let key_ = Object.keys(forbear.data);
                        for (let i = 0; i < key_.length; i++) {
                            data[key_[i]] = forbear.data[key_[i]];
                        }
                    }
                        //判断列表渲染依据的是数组还是对象还是字符串
                        //渲染源是数组时
                        if (trees.for instanceof Array) {
                            //碎片文档
                            if (trees.$value) {
                                valuex_ = trees.$value;
                            }

                            if (trees.$index) {
                                indexx_ = trees.$index;
                            }
                            forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                            forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                            let frag = document.createDocumentFragment();
                            for (let i = 0; i < trees.for.length; i++) {

                                data[valuex_] = trees.for[i];
                                data[indexx_] = i;

                                let tag = tree.render(trees, i, state, data);
                                if (tag) {
                                    frag.appendChild(tag);
                                }
                            }

                            if (!defer) {
                                if (el) {
                                    let next = tree.elementFindNext(0, el, 0);
                                    if (next) {
                                        treex.$el.insertBefore(frag, next);
                                    } else {
                                        treex.$el.appendChild(frag);
                                    }
                                } else {
                                    treex.$el.appendChild(frag);
                                }
                            }
                        }

                        //当渲染源是对象时
                        else if (trees.for instanceof Object) {
                            let frag = document.createDocumentFragment();
                            if (trees.$value) {
                                valuex_ = trees.$value;
                            }

                            if (trees.$index) {
                                indexx_ = trees.$index;
                            }

                            if (trees.$key) {
                                keyx_ = trees.$key;
                            }
                            forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                            forbear.forKeyList['key'][trees.$lcpid] = keyx_;
                            forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                            let key_ = Object.keys(trees.for);
                            for (let i = 0; i < key_.length; i++) {
                                //数据更新
                                data[valuex_] = trees.for[key_[i]];
                                data[indexx_] = i;
                                data[keyx_] = key_[i];

                                let tag = tree.render(trees, 0, state, data);
                                if (tag) {
                                    frag.appendChild(tag);
                                }
                            }
                            //开始插入
                            if (!defer) {
                                if (el) {
                                    let next = tree.elementFindNext(0, el, 0);
                                    if (next) {
                                        treex.$el.insertBefore(frag, next);
                                    } else {
                                        treex.$el.appendChild(frag);
                                    }
                                } else {
                                    treex.$el.appendChild(frag);
                                }
                            }
                        }

                        //当渲染源是字符串时
                        else if (typeof (trees.for) === "string") {
                            let render = tree.textParse(trees.for, false, data);
                            //渲染源是数组时
                            if (render instanceof Array) {
                                let frag = document.createDocumentFragment();
                                if (trees.$value) {
                                    valuex_ = trees.$value;
                                }
                                if (trees.$index) {
                                    indexx_ = trees.$index;
                                }
                                forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                                forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                                for (let i = 0; i < render.length; i++) {

                                    data[valuex_] = render[i];
                                    data[indexx_] = i;
                                    let tag = tree.render(trees, 0, state, data);
                                    if (tag) {
                                        frag.appendChild(tag);
                                    }
                                }
                                if (!defer) {
                                    if (el) {
                                        let next = tree.elementFindNext(0, el, 0);
                                        if (next) {
                                            treex.$el.insertBefore(frag, next);
                                        } else {
                                            treex.$el.appendChild(frag);
                                        }
                                    } else {
                                        treex.$el.appendChild(frag);
                                    }
                                }
                            }

                            //当渲染源是对象时
                            else if (render instanceof Object) {
                                let frag = document.createDocumentFragment();
                                if (trees.$value) {
                                    valuex_ = trees.$value;
                                }

                                if (trees.$index) {
                                    indexx_ = trees.$index;
                                }

                                if (trees.$key) {
                                    keyx_ = trees.$key;
                                }
                                forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                                forbear.forKeyList['key'][trees.$lcpid] = keyx_;
                                forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                                let key_ = Object.keys(render);
                                for (let i = 0; i < key_.length; i++) {
                                    data[valuex_] = render[key_[i]];
                                    data[indexx_] = i;
                                    data[keyx_] = key_[i];
                                    let tag = tree.render(trees, 0, state, data);
                                    if (tag) {
                                        frag.appendChild(tag);
                                    }
                                }
                                if (!defer) {
                                    if (el) {
                                        let next = tree.elementFindNext(0, el, 0);
                                        if (next) {
                                            treex.$el.insertBefore(frag, next);
                                        } else {
                                            treex.$el.appendChild(frag);
                                        }
                                    } else {
                                        treex.$el.appendChild(frag);
                                    }
                                }
                            }

                            //当渲染源是字符串时
                            else if (typeof (render) === "string") {


                                if (trees.$value) {
                                    valuex_ = trees.$value;
                                }

                                if (trees.$index) {
                                    indexx_ = trees.$index;
                                }
                                data[valuex_] = render;
                                data[indexx_] = 0;

                                forbear.forKeyList['value'][trees.$lcpid] = valuex_;
                                forbear.forKeyList['index'][trees.$lcpid] = indexx_;
                                let tag = tree.render(trees, 0, state, data);
                                if (tag) {
                                    if (!defer) {
                                        if (el) {
                                            let next = tree.elementFindNext(0, el, 0);
                                            if (next) {
                                                treex.$el.insertBefore(tag, next);
                                            } else {
                                                treex.$el.appendChild(tag);
                                            }
                                        } else {
                                            treex.$el.appendChild(tag);
                                        }
                                    }
                                }
                            }
                        }
                        tree.treesFindFor(trees);
                    }
                }
                tree.treesFindData(trees);

                if (trees.tag != "text") {
                    //对子元素进行初始化
                    if (!trees.children) {
                        trees.children = [];
                    } else {
                        trees.children = lcpx.copy(trees.children);
                    }
                    //对子元素进行创建
                    for (let i = 0; i < trees.children.length; i++) {
                        tree.createTrunk(trees.children[i], trees, i);
                    }
                    //挂载操作class的方法

                    //对子元素进行监听
                    tree.listenTrunk(trees);
                    //对自身挂载函数
                }

                if (trees.style instanceof Object) {
                    tree.listenStyle(trees, trees.style);
                }

                //对自身进行监听
                tree.listenTree(treex, trees, index_);

                trees.appendChild = function (obj) {
                    let i = this.children.push(lcpx.copy(obj));
                    return this.children[i - 1];
                }
                trees.parent = function () {
                    //根据虚拟描述的lcpid属性进行查找
                    let arr = this.$lcpid.split("-");
                    let parent = window.$lcpid[arr[0]]; //根元素lcp实例
                    for (let i = 1; i < arr.length - 1; i++) {
                        parent = parent.children[arr[i]];
                    }
                    return parent;
                }
                trees.remove = function () {
                    let parent = this.parent();
                    let index_ = this.$index_;
                    if (this.$el) {
                        if (this.$el instanceof Array) {
                            for (let i = 0; i < this.$el.length; i++) {
                                this.$el[i].remove();
                            }
                        } else {
                            this.$el.remove();
                        }
                    }
            
                    if (this.css) {
                        if (this.$css) {
                            document.head.removeChild(this.$css);
                        }
                    }
                    //删除虚拟描述中子对象
                    parent.children.splice(index_, 1);
                    //销毁监听
                    tree.destory(this);
                    //对该子对象的接下来的兄弟元素进行更新lcpid
                    for (let i = index_; i < parent.children.length; i++) {
                        //如果接下来的兄弟元素是对象
                        if (parent.children[i] instanceof Object) {
                            //对lcpid进行更新组装
                            let arr = parent.children[i].$lcpid.split('-');
                            parent.children[i].$index_--;
                            arr[arr.length - 1] = parent.children[i].$index_;
                            //对lcpid进行更新
                            parent.children[i].$lcpid = arr.join('-');
                            //当自身绑定了css样式，需要对style进行重新更新
                            if (parent.children[i].css) {
                                //当自身是列表渲染时，对记录的所有el进行属性赋值
                                if (parent.children[i].$for) {
                                    for (let j = 0; j < parent.children[i].$el.length; j++) {
                                        parent.children[i].$el[j].setAttribute("v-lcpid", parent.children[i].$lcpid);
                                    }
                                }
                                //为普通渲染时
                                else {
                                    parent.children[i].$el.setAttribute("v-lcpid", parent.children[i].$lcpid);
                                }
                                parent.children[i].css = parent.children[i].css;
                            }
                            //对子元素的lcpid进行更新
                            tree.lcpid(parent.children[i]);
                        }
                    }
                }
                trees.removeChild = function (obj) {
                    //判断要删除的子虚拟描述是对象还是文本
                    if (obj instanceof Object) {
                        obj.remove();
                    }
                }
                trees.insertBefore = function (obj) {
                    //获取父虚拟描述
                    let parent = this.parent();
                    //自身虚拟描述的索引
                    let index_ = this.$index_;
                    let objx = lcpx.copy(obj);
                    //在自身前面插入了虚拟描述
                    parent.children.splice(index_, 0, objx);
                    //对自身以及接下来的兄弟元素的lcpid进行更新
                    for (let i = parseInt(index_) + 1; i < parent.children.length; i++) {
                        //判断兄弟元素是不是对象
                        if (parent.children[i] instanceof Object) {
                            //对lcpid进行拼接更新
                            let arr = parent.children[i].$lcpid.split('-');
                            parent.children[i].$index_++;
                            arr[arr.length - 1] = parent.children[i].$index_;
                            parent.children[i].$lcpid = arr.join('-');
            
                            //判断兄弟元素绑定css样式了没
                            if (parent.children[i].css) {
                                //判断兄弟元素是不是列表渲染
                                if (parent.children[i].$el instanceof Array) {
                                    for (let j = 0; j < parent.children[i].$el.length; j++) {
                                        parent.children[i].$el[j].setAttribute("v-lcpid", parent.children[i].$lcpid);
                                    }
                                }
                                //为正常渲染
                                else {
                                    parent.children[i].$el.setAttribute("v-lcpid", parent.children[i].$lcpid);
                                }
                                parent.children[i].css = parent.children[i].css;
                            }
                            //对兄弟元素的子元素进行更新
                            tree.lcpid(parent.children[i]);
                        }
                    }
                    //对新增的虚拟描述进行绑定监听以及创建dom
                    tree.createTrunk(objx, parent, index_, this);
                    //返回新增的虚拟描述
                    return parent.children[index_];
                }
            
                trees.nextElementSibling = function () {
                    let index_ = parseInt(this.$index_) + 1;
                    return this.parent().children[index_];
                }
                trees.forbear = function () {
                    let arr = this.$lcpid.split('-');
                    return window.$lcpid[arr[0]];
                }
                trees.query = function (lcpid) {
                    let arr = lcpid.split("-");
                    let parent = window.$lcpid[arr[0]];
                    for (let i = 1; i < arr.length; i++) {
                        parent = parent.children[arr[i]];
                    }
                    return parent;
                }
                trees.classList = {
                    add(name) {
                        //初始化class
                        this.class = this.class ? this.class : [];
                        //判断描述的class是对象还是数组
                        if (this.class instanceof Array) {
                            //当为数组时
                            for (let i = 0; i < this.class.length; i++) {
                                if (name == this.class[i]) {
                                    //已有
                                    return false;
                                }
                            }
                            //没找到时
                            this.class.push(name);
                            this.$el.classList.add(name);
                            return true;
                        } else //当为对象时
                            if (this.class instanceof Object) {
                                //判断是否已有这个class
                                for (let key in trees.class) {
                                    if (key == name && trees.class[name]) {
                                        return false;
                                    } else
                                        if (key == name) {
                                            //已有但没开启
                                            trees.class[name] = true;
                                            trees.$el.classList.add(name);
                                            return true;
                                        }
                                }
                                //没有就新增
                                trees.class[name] = true;
                                trees.$el.classList.add(name);
                                return true;
                            }
                    },
                    remove(name) {
                        //判断描述的class是对象还是数组
                        if (trees.class instanceof Array) {
                            for (let i = 0; i < trees.class.length; i++) {
                                if (trees.class[i] == name) {
                                    trees.class.splice(i, 1);
                                    trees.$el.classList.remove(name);
                                    return true;
                                }
                            }
                            return false;
                        } else
                            if (trees.class instanceof Object) {
                                if (trees.class[name]) {
                                    delete trees.class[name];
                                    trees.$el.classList.remove(name);
                                    return true;
                                }
                                return false;
                            }
                    }
                }

                //将children属性修改为不可修改，子元素不可直接覆盖
                Object.defineProperty(trees, "children", {
                    writable: false
                })

                if (defer) {
                    return trees;
                }

            }

        },
        renderTrunk(trees, index_, defer = false) {
            if(index_ == 0){
                if (trees.css) {
                    let style = document.createElement("style");
                    let text = trees.css.replace(/\{lcpid\}/g, "*[v-lcpid='" + trees.$lcpid + "']");
                    style.textContent = text;
                    trees.$css = style;
                    document.head.appendChild(style);
                }
            }
            //自身是列表渲染
            if (trees.$for) {
                let manage = {};
                let manage_ = {};
                let managex = {};
                //进行推导数据
                let arrx = [];
                let objx = {};
                const forbear = tree.forbear(trees.$lcpid);
                let data = {};
                if(forbear.data){
                let key_ = Object.keys(forbear.data);
                for (let i = 0; i < key_.length; i++) {
                    data[key_[i]] = forbear.data[key_[i]]
                }
            }
                let realData = treesRealData[trees.$lcpid];
                for (let i = 0; i < index_; i++) {
                    tree.reality(trees, arrx, manage, manage_, objx, managex, data);
                }
                let show_if = trees.hasOwnProperty("show");
                let class_isArr = trees.class instanceof Array;
                let class_isObj = trees.class instanceof Object;
                let style_isObj = trees.style instanceof Object;
                let style_isArr = trees.style instanceof Array;
                let style_obj, class_obj, other_obj;
                if (style_isObj) {
                    style_obj = Object.keys(trees.style);
                }
                if (class_isObj) {
                    class_obj = Object.keys(trees.class);
                }
                if (trees.$other) {
                    other_obj = Object.keys(trees.$other);
                }

                for (let i = index_; i < trees.$el.length; i++) {
                    let realObj = {};
                    tree.reality(trees, arrx, manage, manage_, objx, managex, data);

                    let tag = trees.$el[i];
                    if (trees.tag != "text") {
                        if (trees.css) {
                            tag.setAttribute("v-lcpid", trees.$lcpid);
                        }

                        //对class属性进行遍历
                        let classx = trees.class;
                        if (classx) {
                            if (class_isArr) {
                                realObj.class = [];
                                for (let k = 0; k < classx.length; k++) {
                                    let texts = tree.textParse(valuex, true, data);
                                    tag.classList.add(texts);
                                    realObj.class.push(texts);
                                }
                            } else if (class_isObj) {
                                let key_ = class_obj;
                                realObj.class = [];
                                for (let k = 0; k < key_.length; k++) {
                                    if (typeof (classx[key_[k]]) === "string") {
                                        let data = tree.textParse(classx[key_], false, data);
                                        if (data) {
                                            tag.classList.add(key_);
                                            realObj.push(key_);
                                        }
                                    } else {
                                        if (classx[key_[k]]) {
                                            tag.classList.add(key_[k]);
                                            realObj.push(key_[k]);
                                        }
                                    }

                                }
                            } else {
                                let texts = tree.textParse(classx, true, data);
                                tag.className = texts;
                                realObj.class = texts.split(' ');
                            }
                        }

                        //对style属性进行遍历
                        let style = trees.style;
                        if (style) {
                            //对数组进行转换
                            let styles = {};
                            if (style_isArr) {
                                for (let i = 0; i < style.length; i++) {
                                    let key_ = Object.keys(style[i]);
                                    for (let k = 0; k < key_.length; k++) {
                                        styles[key_[k]] = style[i][key_[k]];
                                    }
                                }
                                style = styles;
                            }
                            //将样式绑定到标签
                            if (style_isObj) {
                                realObj.style = {};
                                let key_ = style_obj;
                                for (let k = 0; k < key_.length; k++) {
                                    let texts = tree.textParse(style[key_], true, data);
                                    tag.style[key_[k]] = texts;
                                    realObj.style[key_[k]] = texts;
                                }
                            } else {
                                let texts = tree.textParse(style, true, data);
                                tag.style = texts;
                                realObj.style = texts;
                            }
                        }

                        //对其他属性进行循环遍历
                        if (trees.$other) {
                            let key_ = other_obj;
                            for (let k = 0; k < key_.length; k++) {
                                if (trees.$other[key_[k]] instanceof Function) {
                                    tag[key_[k]] = trees.$other[key_[k]].bind(trees);
                                } else { //对v-xx这种自定义属性进行绑定
                                    if (typeof (trees.$other[key_[k]]) === "string") {
                                        realObj.other = {};
                                        let texts = tree.textParse(trees[key_], true, data);
                                        tag.setAttribute(key_[k], texts);
                                        realObj.other[key_[k]] = texts;
                                    } else {
                                        tag.setAttribute(key_[k], trees.$other[key_[k]]);
                                    }

                                }
                            }
                        }


                        //当show存在且为false
                        if (show_if) {
                            realObj.show = true;
                            if (typeof (trees.show) === "string") {
                                let data = tree.textParse(trees.show, false, data);
                                if (!data) {
                                    tag.style.display = "none";
                                    realObj.show = false;
                                }

                            } else {
                                if (!trees.show) {
                                    tag.style.display = "none";
                                    realObj.show = false;
                                }
                            }
                        }

                    }


                    //判断这个元素是否有text属性，且没有子元素的情况下，直接给文本内容
                    let chx = trees['children'] && trees['children'].length;
                    if (trees['text'] && !chx) {
                        let texts = tree.textParse(trees['text'], true, data);
                        tag.textContent = texts;
                        realObj.text = texts;
                    }
                    realData.push(realObj);
                }

                if (!defer) {
                    //进行归队处理
                    tree.treesRejoin(trees);
                }

                //对子元素进行渲染
                if (trees.children) {
                    for (let i = 0; i < trees.children.length; i++) {
                        //子元素是不是列表渲染
                        let self = trees.children[i];
                        let length = 0;
                        //是列表渲染
                        if (self.for) {
                            //是数组渲染
                            if (self.for instanceof Array) {
                                length = self.for.length * trees.$el.length;
                            }
                            //是对象渲染
                            else if (self.for instanceof Object) {
                                length = Object.keys(self.for).length * trees.$el.length;
                            }
                            //是字符串时
                            else if (typeof (self.for) === "string") {
                                let manage = {};
                                let manage_ = {};
                                let managex = {};
                                //进行推导数据
                                let arrx = [];
                                let objx = {};
                                let data = {};
                                if(forbear.data){
                                let key_ = Object.keys(forbear.data);
                                for (let i = 0; i < key_.length; i++) {
                                    data[key_[i]] = forbear.data[key_[i]]
                                }
                            }
                                for (let j = 0; j < trees.$el.length; j++) {
                                    tree.reality(trees, arrx, manage, manage_, objx, managex, data);
                                    let render = tree.textParse(self.for, false, data);
                                    //是数组时
                                    if (render instanceof Array) {
                                        length += render.length;
                                    }
                                    //是对象时
                                    else if (render instanceof Array) {
                                        length += Object.keys(render).length;
                                    }
                                    //是字符串时
                                    else if (typeof (render) === "string") {
                                        length += 1;
                                    }
                                }

                            }
                        } else {
                            length = trees.$el.length;
                        }
                        //当新的元素个数少于现有的元素个数
                        if (length < self.$el.length) {
                            //进行删除
                            for (let j = length; j < self.$el.length; j++) {
                                self.$el[j].remove();
                            }
                            self.$el = self.$el.slice(0, length);
                            tree.childRejoin(self);
                        }
                        //当新的元素个数多于现有的元素个数
                        if (length > self.$el.length) {
                            //进行创建
                            let length2 = self.$el.length;
                            for (let j = self.$el.length; j < length; j++) {
                                let tags;
                                if (self.tag == "text") {
                                    tags = document.createTextNode("");
                                } else {
                                    tags = document.createElement(self.tag);
                                }
                                self.$el.push(tags);
                            }
                            tree.renderTrunk(self, length2);
                        }

                    }
                }
                if (defer) {
                    if (index_ == 0) {
                        trees.$defer = true;
                    }
                    return trees;
                }

            }
        },
        //渲染
        render(trees, i, state, data) {
            let arr = treesRealData[trees.$lcpid];
            let weakobj = {};
            let tag;
            if (trees.tag == "text") {
                tag = document.createTextNode("");
            } else {
                tag = document.createElement(trees.tag);
            }

            if (trees.tag != "text") {
                if (trees.css) {
                    tag.setAttribute("v-lcpid", trees.$lcpid);
                }

                //对class属性进行遍历
                let classx = trees.class;
                if (classx) {
                    if (state.class_isArr) {
                        weakobj.class = [];
                        for (let k = 0; k < classx.length; k++) {
                            let texts = tree.textParse(classx[k], true, data);
                            tag.classList.add(texts);
                            weakobj.class.push(texts);
                        }
                    } else if (state.class_isObj) {
                        weakobj.class = [];
                        let key_ = state.class_obj;
                        for (let k = 0; k < key_.length; k++) {
                            if (typeof (classx[key_[k]]) === "string") {
                                let data_ = tree.textParse(classx[key_[k]], false, data);
                                if (data_) {
                                    tag.classList.add(key_[k]);
                                    weakobj.class.push(key_[k]);
                                }
                            } else {
                                if (classx[key_[k]]) {
                                    tag.classList.add(key_[k]);
                                    weakobj.class.push(key_[k]);
                                }
                            }

                        }
                    } else {
                        let texts = tree.textParse(classx, true, data);
                        weakobj.class = texts.split(' ');
                        tag.className = texts;
                    }
                }

                //对style属性进行遍历
                let style = trees.style;
                if (style) {
                    //对数组进行转换
                    let styles = {};
                    if (state.style_isArr) {
                        for (let i = 0; i < style.length; i++) {
                            if (style[i] instanceof Object) {
                                let key_ = Object.keys(style[i]);
                                for (let k = 0; k < key_.length; k++) {
                                    styles[key_[k]] = style[i][key_[k]];
                                }
                            }
                        }
                        style = styles;
                    }
                    //将样式绑定到标签
                    if (state.style_isObj) {
                        weakobj.style = {};
                        let key_ = state.style_obj;
                        for (let k = 0; k < key_.length; k++) {
                            let texts = tree.textParse(style[key_[k]], true, data);
                            tag.style[key_[k]] = texts;
                            weakobj.style[key_[k]] = texts;
                        }
                    } else if (typeof (style) === "string") {
                        let texts = tree.textParse(style, true, data);
                        tag.style = texts;
                        weakobj.style = texts;
                    }

                }

                //对其他属性进行循环遍历
                let key_ = state.other_obj;
                weakobj.other = {};
                for (let k = 0; k < key_.length; k++) {
                    if (trees[key_[k]] instanceof Function) {
                        tag[key_[k]] = trees[key_[k]].bind(trees);
                    } else { //对v-xx这种自定义属性进行绑定
                        if (typeof (trees[key_[k]]) === "string") {
                            let texts = tree.textParse(trees[key_[k]], true, data);
                            tag.setAttribute(key_[k], texts);
                            weakobj.other[key_[k]] = texts;
                        } else {
                            tag.setAttribute(key_[k], trees[key_[k]]);
                        }
                    }
                }

                //当show存在且为false
                if (state.show_if) {
                    weakobj.show = true;
                    if (typeof (trees.show) === "string") {
                        let data = tree.textParse(trees.show, false, data);
                        if (!data) {
                            tag.style.display = "none";
                            weakobj.show = false;
                        }
                    } else {
                        if (!trees.show) {
                            tag.style.display = "none";
                            weakobj.show = false;
                        }
                    }
                }

            }


            //判断这个元素是否有text属性，且没有子元素的情况下，直接给文本内容

            if (trees['text']) {
                let chx = trees['children'] && trees['children'].length;
                if (!chx) {
                    let texts = tree.textParse(trees['text'], true, data);
                    tag.textContent = texts;
                    weakobj.text = texts;
                }
            }

            let ifx = true;
            //当if存在时
            if (state.if_if) {
                if (typeof (trees.if) === "string") {
                    ifx = tree.textParse(trees.if, false, data);
                } else {
                    ifx = trees.if;
                }
            }
            weakobj.if = ifx;
            if (trees.$for) {
                trees.$el.push(tag);
                trees.$state.parent.push(i);
            } else {
                trees.$el = tag;
                trees.$state.parent = i;
            }
            arr.push(weakobj);
            if (ifx) {
                if (trees.$for) {
                    trees.$state.if.push(1);
                } else {
                    trees.$state.if = 1;
                }
                return tag;
            } else {
                if (trees.$for) {
                    trees.$state.if.push(0);
                } else {
                    trees.$state.if = 0;
                }
                return false;
            }



        },
        //对自身元素进行归队处理
        treesRejoin(trees) {
            //是列表渲染
            if (trees.$for) {
                let manage = {};
                let manage_ = {};
                let managex = {};
                let parent = trees.parent();
                let forbear = tree.forbear(trees.$lcpid);
                let frag = document.createDocumentFragment();
                let m = -1;
                let s = -1;
                let arr = [];
                let objx = {};
                let data = {};
                if(forbear.data){
                let key_ = Object.keys(forbear.data);
                for (let i = 0; i < key_.length; i++) {
                    data[key_[i]] = forbear.data[key_[i]]
                }
            }
                let realData = treesRealData[trees.$lcpid];
                let if_if = trees.hasOwnProperty("if");
                for (let i = 0; i < trees.$el.length; i++) {
                    let realData_ = realData[i];

                    tree.reality(trees, arr, manage, manage_, objx, managex, data);

                    if (trees.for && parent.$for) {
                        m = objx.parent;
                        s = objx.trees;
                    } else {
                        m = objx.trees;
                        s = objx.trees;
                    }
                    if (!parent.$for) {
                        m = -1;
                        objx.parentLength = null;
                        s = -1;
                    }
                    if (!trees.for && parent.$for) {
                        objx.parentLength = 1;
                    }

                    let state = false;
                    if (i >= trees.$state.if.length) {
                        let ifx = true;
                        //当if存在时
                        if (if_if) {
                            if (typeof (trees.if) === "string") {
                                ifx = tree.textParse(trees.if, false, data);
                            } else {
                                ifx = trees.if;
                            }
                        }
                        if (ifx) {
                            state = true;
                            trees.$state.if.push(1);
                        } else {
                            trees.$state.if.push(0);
                        }
                    } else {
                        state = trees.$state.if[i];
                    }
                    let ifx = false;
                    if (state) {
                        let mx = 0;
                        if (m >= 0) {
                            mx = m;
                        }
                        if (i >= trees.$state.parent.length) {
                            ifx = true;
                            if (m >= 0) {
                                trees.$state.parent.push(m);
                            } else {
                                trees.$state.parent.push(0);
                            }
                        }
                        else if (mx != trees.$state.parent[i]) {
                            ifx = true;
                            trees.$state.parent[i] = mx;
                        }

                    }
                    if (ifx) {
                        frag.appendChild(trees.$el[i]);
                    }
                    realData_.if = state;
                    if (s + 1 == objx.parentLength || s + 1 > objx.parentLength) {
                        let parentEl;
                        if (m >= 0) {
                            parentEl = parent.$el[m];
                        }
                        let next = trees.nextElementSibling();
                        if (next) {
                            next = tree.elementFindNext(m, next, 0);
                        }
                        if (next) {
                            parentEl.insertBefore(frag, next);
                        } else {
                            parentEl.appendChild(frag);
                        }
                        frag = document.createDocumentFragment();
                    }
                }
                if (m == -1) {
                    let next = trees.nextElementSibling();
                    if (next) {
                        next = tree.elementFindNext(0, next, 0);
                    }
                    console.log(parent)
                    if (next) {
                        parent.$el.insertBefore(frag, next);
                    } else {
                        parent.$el.appendChild(frag);
                    }

                }
            }
        },
        //对自身元素以及所有子元素进行归队处理
        childRejoin(trees,clear) {
            if(clear){
                trees.$el = [];
                trees.$state.if = [];
                trees.$state.parent = [];
                if (trees.css) {
                    if(trees.$css){
                        trees.$css.remove();
                        trees.$css = null;
                    }
                }
            }else{
                this.treesRejoin(trees);
            }
            
            //对子元素进行归队处理
            let forbear = tree.forbear(trees.$lcpid);
            let children = trees.children;
            if (children) {
                if (children.length > 0) {
                    for (let i = 0; i < children.length; i++) {
                        if(clear){
                            tree.childRejoin(children[i],true);
                        }else{
                            //找到子元素应有的长度
                            let length = 0;
                            let self = children[i];
                            if (self.for) {
                                if (self.for instanceof Array) {
                                    length = trees.$el.length * self.for.length;
                                }
                                else if (self.for instanceof Object) {
                                    length = trees.$el.length * Object.keys(self.for).length;
                                }
                                else if (typeof (self.for) === "string") {
                                    //进行环境还原
                                    let manage = {};
                                    let manage_ = {};
                                    let managex = {};
                                    let arrx = [];
                                    let objx = {};
                                    let data = {};
                                    if(forbear.data){
                                    let key_ = Object.keys(forbear.data);
                                    for (let i = 0; i < key_.length; i++) {
                                        data[key_[i]] = forbear.data[key_[i]]
                                    }
                                }
                                    for (let j = 0; j < trees.$el.length; j++) {
                                        tree.reality(trees, arrx, manage, manage_, objx, managex, data);
    
                                        let render = tree.textParse(self.for, false, data);
                                        if (render instanceof Array) {
                                            length += render.length;
                                        }
                                        else if (render instanceof Object) {
                                            length += Object.keys(render).length;
                                        }
                                        else if (typeof (render) === "string") {
                                            length++;
                                        }
                                    }
                                }
                            } else {
                                length = trees.$el.length;
                            }
                            if (self.$el.length > length) {
                                for (let k = length; k < self.$el.length; k++) {
                                    self.$el[k].remove();
                                }
                                self.$el = self.$el.slice(0, length);
                                self.$state.if = self.$state.if.slice(0, length);
                                self.$state.parent = self.$state.parent.slice(0, length);
                                if(length > 0){
                                    this.childRejoin(self);
                                }else{
                                    this.childRejoin(self,true);
                                }
                                
                            }
                        }
                        
                        

                        
                    }
                }
            }

        },
        //拷贝虚拟描述对象
        cloneNode(trees) {
            let obj = {
                children: []
            };
            let include = ["$el", "$css", "children", "$forList", "insertBefore", "remove", "removeChild", "$index_", "$for", "parent", "forbear", "nextElementSibling", "query", "$lcpid", "classList", "appendChild"];

            for (let key in trees) {
                if (!include.includes(key)) {
                    obj[key] = lcpx.copy(trees[key]);
                }
            }
            if (trees['children']) {
                for (let i = 0; i < trees['children'].length; i++) {
                    let data = this.cloneNode(trees.children[i]);
                    obj.children.push(data);
                }
            }

            return obj;
        },
        //销毁监听与对象
        destory(treex) {
            let list = [treex];
            function a(trees) {
                if (trees.children) {
                    for (let i = 0; i < trees.children.length; i++) {
                        list.push(trees.children[i]);
                        a(trees.children[i]);
                    }
                }
            }
            a(treex);
            for (let i = 0; i < list.length; i++) {
                list[i] = null;
            }
            list = null;
        },
        //通过lcpid查找虚拟描述对象
        query(lcpid) {
            let arr = lcpid.split("-");
            let parent = window.$lcpid[arr[0]];
            for (let i = 1; i < arr.length; i++) {
                parent = parent.children[arr[i]];
            }
            return parent;
        },
        //根据lcpid取树元素
        forbear(lcpid) {
            let arr = lcpid.split('-');
            return window.$lcpid[arr[0]];
        },
        //从虚拟描述里找到依赖data的部分，并记录
        treesFindData(trees) {
            let forbear = tree.forbear(trees.$lcpid);
            let data = forbear.listenDataList;
            if (trees.tag != "text") {
                let classx = trees.class;
                let style = trees.style;
                //对class属性进行遍历
                if (classx) {
                    let arrs = [];
                    if (classx instanceof Array) {
                        for (let i = 0; i < classx.length; i++) {
                            let arr = tree.textFindData(classx[i], data, true);
                            if (arr) {
                                arrs.push(...arr);
                            }
                        }
                    } else if (classx instanceof Object) {
                        let key_ = Object.keys(classx);
                        for (let i = 0; i < key_.length; i++) {
                            if (typeof (classx[key_[i]]) === "string") {
                                let arr = tree.textFindData(classx[key_[i]], data, false);
                                if (arr) {
                                    arrs.push(...arr);
                                }
                            }
                        }
                    } else {
                        let arr = tree.textFindData(classx, data, true);
                        if (arr) {
                            arrs.push(...arr);
                        }
                    }
                    for (let i = 0; i < arrs.length; i++) {
                        if (data[arrs[i]][trees.$lcpid] instanceof Array) {
                            if (!data[arrs[i]][trees.$lcpid].includes("class")) {
                                data[arrs[i]][trees.$lcpid].push("class");
                            }
                        } else {
                            data[arrs[i]][trees.$lcpid] = ["class"];
                        }
                    }
                }

                //对style属性进行遍历
                if (style) {
                    let arrs = [];
                    //对数组进行转换
                    let styles = {};
                    if (style instanceof Array) {
                        for (let i = 0; i < style.length; i++) {
                            if (style[i] instanceof Object) {
                                for (let key in style[i]) {
                                    styles[key] = style[i][key];
                                }
                            }
                        }
                        style = styles;
                    }
                    //将样式绑定到标签
                    if (style instanceof Object) {
                        let key_ = Object.keys(style);
                        for (let i = 0; i < key_.length; i++) {
                            let arr = tree.textFindData(style[key_[i]], data, true);
                            if (arr) {
                                arrs.push(...arr);
                            }
                        }
                    } else {
                        let arr = tree.textFindData(style, data, true);
                        if (arr) {
                            arrs.push(...arr);
                        }
                    }
                    for (let i = 0; i < arrs.length; i++) {
                        if (data[arrs[i]][trees.$lcpid] instanceof Array) {
                            if (!data[arrs[i]][trees.$lcpid].includes("style")) {
                                data[arrs[i]][trees.$lcpid].push("style");
                            }
                        } else {
                            data[arrs[i]][trees.$lcpid] = ["style"];
                        }
                    }
                }

                //对其他属性进行循环遍历
                if (trees.$other) {
                    let key_ = Object.keys(trees.$other);
                    let arrs = [];
                    for (let i = 0; i < key_.length; i++) {
                        if (typeof (trees[key_[i]]) === "string") {
                            let arr = tree.textFindData(trees[key_[i]], data, true);
                            if (arr) {
                                arrs.push(...arr);
                            }
                        }
                    }
                    for (let i = 0; i < arrs.length; i++) {
                        if (data[arrs[i]][trees.$lcpid] instanceof Array) {
                            if (!data[arrs[i]][trees.$lcpid].includes("other")) {
                                data[arrs[i]][trees.$lcpid].push("other");
                            }
                        } else {
                            data[arrs[i]][trees.$lcpid] = ["other"];
                        }
                    }

                }

                //当show存在且为false
                let arrs = [];
                if (trees.hasOwnProperty('show')) {
                    if (typeof (trees.show) === "string") {
                        let arr = tree.textFindData(trees.show, data, false);
                        if (arr) {
                            arrs.push(...arr);
                        }
                    }
                }
                for (let i = 0; i < arrs.length; i++) {
                    if (data[arrs[i]][trees.$lcpid] instanceof Array) {
                        if (!data[arrs[i]][trees.$lcpid].includes("show")) {
                            data[arrs[i]][trees.$lcpid].push("show");
                        }
                    } else {
                        data[arrs[i]][trees.$lcpid] = ["show"];
                    }
                }

            }


            //判断这个元素是否有text属性，且没有子元素的情况下，直接给文本内容
            let arrs = [];
            if (trees['text']) {
                let chx = trees['children'] && trees['children'].length;
                if (!chx) {
                    let arr = tree.textFindData(trees.text, data, true);
                    if (arr) {
                        arrs.push(...arr);
                    }
                }
            }
            for (let i = 0; i < arrs.length; i++) {
                if (data[arrs[i]][trees.$lcpid] instanceof Array) {
                    if (!data[arrs[i]][trees.$lcpid].includes("text")) {
                        data[arrs[i]][trees.$lcpid].push("text");
                    }
                } else {
                    data[arrs[i]][trees.$lcpid] = ["text"];
                }
            }


            //当if属性不存在或者if为true
            arrs = [];
            if (trees.hasOwnProperty('if')) {
                if (typeof (trees.if) === "string") {
                    let arr = tree.textFindData(trees.if, data, false);
                    if (arr) {
                        arrs.push(...arr);
                    }
                }
            }
            for (let i = 0; i < arrs.length; i++) {
                if (data[arrs[i]][trees.$lcpid] instanceof Array) {
                    if (!data[arrs[i]][trees.$lcpid].includes("if")) {
                        data[arrs[i]][trees.$lcpid].push("if");
                    }
                } else {
                    data[arrs[i]][trees.$lcpid] = ["if"];
                }
            }

            //当for存在
            arrs = [];
            if (trees.hasOwnProperty('for')) {
                if (typeof (trees.for) === "string") {
                    let arr = tree.textFindData(trees.for, data, false);
                    if (arr) {
                        arrs.push(...arr);
                    }
                }
            }
            for (let i = 0; i < arrs.length; i++) {
                if (data[arrs[i]][trees.$lcpid] instanceof Array) {
                    if (!data[arrs[i]][trees.$lcpid].includes("for")) {
                        data[arrs[i]][trees.$lcpid].push("for");
                    }
                } else {
                    data[arrs[i]][trees.$lcpid] = ["for"];
                }
            }


        },
        //从虚拟描述里找到依赖for的部分，并记录
        treesFindFor(trees) {
            let lcpid = trees.$lcpid;
            let forbear = tree.forbear(lcpid);
            let keyList = forbear.forKeyList;
            let valuex = keyList["value"][lcpid];
            let keyx = keyList["key"][lcpid];
            let indexx = keyList["index"][lcpid];
            let arr = lcpid.split('-');
            function find(text, type, mode = true) {
                let texts;
                if (mode) {
                    texts = text.match(/(?<=\{\{)[^\}\}]*(?=\}\})/g);
                    if (texts instanceof Array) {
                        for (let i = 0; i < texts.length; i++) {
                            if (find(texts[i], type, false)) {
                                return true;
                            }
                        }
                    } else {
                        return false;
                    }
                }
                if (valuex) {
                    if (tree.textFindKey(text, valuex)) {
                        if (trees.$forList[lcpid] instanceof Array) {
                            if (!trees.$forList[lcpid].includes(type)) {
                                trees.$forList[lcpid].push(type);
                            }
                        } else {
                            trees.$forList[lcpid] = [type]
                        }
                        return true;
                    }
                }
                if (keyx) {
                    if (tree.textFindKey(text, keyx)) {
                        if (trees.$forList[lcpid] instanceof Array) {
                            if (!trees.$forList[lcpid].includes(type)) {
                                trees.$forList[lcpid].push(type);
                            }
                        } else {
                            trees.$forList[lcpid] = [type]
                        }
                        return true;
                    }
                }
                if (indexx) {
                    if (tree.textFindKey(text, indexx)) {
                        if (trees.$forList[lcpid] instanceof Array) {
                            if (!trees.$forList[lcpid].includes(type)) {
                                trees.$forList[lcpid].push(type);
                            }
                        } else {
                            trees.$forList[lcpid] = [type]
                        }
                        return true;
                    }
                }
            }
            for (let j = 2; j < arr.length; j++) {
                let lcpid2 = arr.slice(0, j).join("-");
                tree.findParentFor(trees, lcpid2, lcpid);
            }
            if (trees.for) {
                if (trees.tag != "text") {
                    let classx = trees.class;
                    let style = trees.style;

                    //对class属性进行遍历
                    if (classx) {
                        if (classx instanceof Array) {
                            for (let i = 0; i < classx.length; i++) {
                                if (find(classx[i], "class")) {
                                    break;
                                }
                            }
                        } else if (classx instanceof Object) {
                            let key_ = Object.keys(classx);
                            for (let i = 0; i < key_.length; i++) {
                                if (typeof (classx[key_[i]]) === "string") {
                                    if (find(classx[key_[i]], "class", false)) {
                                        break;
                                    }
                                }
                            }
                        } else {
                            find(classx, "class")
                        }

                    }

                    //对style属性进行遍历
                    if (style) {
                        //对数组进行转换
                        let styles = {};
                        if (style instanceof Array) {
                            for (let i = 0; i < style.length; i++) {
                                if (style[i] instanceof Object) {
                                    let key_ = Object.keys(style[i]);
                                    for (let j = 0; j < key_.length; j++) {
                                        styles[key_[j]] = style[i][key_[j]];
                                    }
                                }
                            }
                            style = styles;
                        }
                        //将样式绑定到标签
                        if (style instanceof Object) {
                            let key_ = Object.keys(style);
                            for (let i = 0; i < key_.length; i++) {
                                if (find(style[key_[i]], "style")) {
                                    break;
                                }
                            }
                        } else {
                            find(style, "style")
                        }

                    }

                    //对其他属性进行循环遍历
                    if (trees.$other) {
                        let key_ = Object.keys(trees.$other);
                        for (let i = 0; i < key_.length; i++) {

                            if (typeof (trees[key_[i]]) === "string") {
                                if (find(trees[key_[i]], "other")) {
                                    break;
                                }
                            }

                        }
                    }



                    //当show存在且为false
                    if (trees.hasOwnProperty('show')) {
                        if (typeof (trees.show) === "string") {
                            find(trees.show, "show", false);
                        }
                    }


                }


                //判断这个元素是否有text属性，且没有子元素的情况下，直接给文本内容
                if (trees['text']) {
                    let chx = trees['children'] && trees['children'].length;
                    if (!chx) {
                        find(trees.text, "text");
                    }
                }



                //当if属性不存在或者if为true
                if (trees.hasOwnProperty('if')) {
                    if (typeof (trees.if) === "string") {
                        find(trees.if, "if", false);
                    }
                }
            }

        },
        //找到字符串内引用data数据的关键词 并记录 返回替换后的真实值
        textFindData(text, data_, mode) {
            let arr = [];
            if (mode) {
                let texts = text.match(/(?<=\{\{)[^\}\}]*(?=\}\})/g);
                if (texts instanceof Array) {
                    for (let i = 0; i < texts.length; i++) {
                        let key_ = Object.keys(data_);
                        for (let j = 0; j < key_.length; j++) {
                            if (tree.textFindKey(texts[i], key_[j])) {
                                arr.push(key_[j]);
                            }
                        }
                    }
                } else {
                    return false;
                }
            } else {
                let key_ = Object.keys(data_);
                for (let i = 0; i < key_.length; i++) {
                    if (tree.textFindKey(text, key_[i])) {
                        arr.push(key_[i]);
                    }
                }
            }
            if (arr.length > 0) {
                return arr;
            }
            return false;
        },
        //解析字符串
        textParse(text, mode = true, data) {
            let texts;
            if (mode) {
                if (/\{/.test(text)) {
                    texts = text.match(/(?<=\{\{)[^\}\}]*(?=\}\})/g);
                }
            }
            //拷贝一份text用于替换真实数据
            if (mode) {
                if (texts instanceof Array) {
                    let textx = text;
                    for (let i = 0; i < texts.length; i++) {
                        textx = textx.replace("\{\{" + texts[i] + "\}\}", $parse(texts[i], data));
                    }
                    return textx;
                } else {
                    return text;
                }
            } else {
                return $parse(text, data);
            }

        },
        //判断依赖不依赖父元素的列表循环关键词
        findParentFor(trees, lcpid, lcpid2) {
            let parent = this.forbear(lcpid);
            let treex = tree.query(lcpid);
            let keyList = parent.forKeyList;
            let arr = lcpid.split('-');
            let arr2 = lcpid2.split('-');
            let valuex;
            let keyx;
            let indexx;
            valuex = keyList["value"][lcpid];
            keyx = keyList["key"][lcpid];
            indexx = keyList["index"][lcpid];
            let old_value = valuex;
            let old_key = keyx;
            let old_index = indexx;
            let length = arr2.length;
            for (let i = arr.length + 1; i <= length; i++) {
                let lcpid3 = arr2.slice(0, i).join("-");
                let value = keyList["value"][lcpid3];
                let key = keyList["key"][lcpid3];
                let index = keyList["index"][lcpid3];
                if (valuex == value) {
                    valuex = null;
                }
                if (keyx == key) {
                    keyx = null;
                }
                if (indexx == index) {
                    indexx = null;
                }
            }
            function find(text, type, mode = true) {
                let texts;
                if (mode) {
                    texts = text.match(/(?<=\{\{)[^\}\}]*(?=\}\})/g);
                    if (texts instanceof Array) {
                        for (let i = 0; i < texts.length; i++) {
                            if (find(texts[i], type, false)) {
                                return true;
                            }
                        }
                    } else {
                        return false;
                    }
                }
                if (valuex) {
                    if (tree.textFindKey(text, valuex)) {
                        if (treex.$forList[lcpid2] instanceof Array) {
                            if (!treex.$forList[lcpid2].includes(type)) {
                                treex.$forList[lcpid2].push(type);
                            }
                        } else {
                            treex.$forList[lcpid2] = [type]
                        }
                        return true;
                    }
                }
                if (keyx) {
                    if (tree.textFindKey(text, keyx)) {
                        if (treex.$forList[lcpid2] instanceof Array) {
                            if (!treex.$forList[lcpid2].includes(type)) {
                                treex.$forList[lcpid2].push(type);
                            }
                        } else {
                            treex.$forList[lcpid2] = [type]
                        }
                        return true;
                    }
                }
                if (indexx) {
                    if (tree.textFindKey(text, indexx)) {
                        if (treex.$forList[lcpid2] instanceof Array) {
                            if (!treex.$forList[lcpid2].includes(type)) {
                                treex.$forList[lcpid2].push(type);
                            }
                        } else {
                            treex.$forList[lcpid2] = [type]
                        }
                        return true;
                    }
                }
            }


            if (trees.tag != "text") {
                let classx = trees.class;
                let style = trees.style;

                //对class属性进行遍历
                if (classx) {
                    if (classx instanceof Array) {
                        for (let value of classx) {
                            if (find(value, "class")) {
                                break;
                            }
                        }
                    } else if (classx instanceof Object) {
                        for (let key in classx) {
                            if (typeof (classx[key]) === "string") {
                                if (find(classx[key], "class", false)) {
                                    break;
                                }
                            }
                        }
                    } else {
                        find(classx, "class")
                    }

                }

                //对style属性进行遍历
                if (style) {
                    //对数组进行转换
                    let styles = {};
                    if (style instanceof Array) {
                        for (let i = 0; i < style.length; i++) {
                            if (style[i] instanceof Object) {
                                for (let key in style[i]) {
                                    styles[key] = style[i][key];
                                }
                            }
                        }
                        style = styles;
                    }
                    //将样式绑定到标签
                    if (style instanceof Object) {
                        for (let key in style) {
                            if (find(style[key], "style")) {
                                break;
                            }
                        }
                    } else {
                        find(style, "style")
                    }

                }

                //对其他属性进行循环遍历
                for (let key in trees) {
                    if (!exclude.includes(key)) {
                        if (typeof (trees[key]) === "string") {
                            if (find(trees[key], "other")) {
                                break;
                            }
                        }
                    }
                }


                //当show存在且为false
                if (trees.hasOwnProperty('show')) {
                    if (typeof (trees.show) === "string") {
                        find(trees.show, "show", false);
                    }
                }


            }


            //判断这个元素是否有text属性，且没有子元素的情况下，直接给文本内容
            if (trees['text']) {
                let chx = trees['children'] && trees['children'].length;
                if (!chx) {
                    find(trees.text, "text");
                }
            }



            //当if属性不存在或者if为true
            if (trees.hasOwnProperty('if')) {
                if (typeof (trees.if) === "string") {
                    find(trees.if, "if", false);
                }
            }

            valuex = old_value;
            keyx = old_key;
            indexx = old_index;
            for (let i = arr.length + 1; i < length; i++) {
                let lcpid3 = arr2.slice(0, i).join("-");
                let value = keyList["value"][lcpid3];
                let key = keyList["key"][lcpid3];
                let index = keyList["index"][lcpid3];
                if (valuex == value) {
                    valuex = null;
                }
                if (keyx == key) {
                    keyx = null;
                }
                if (indexx == index) {
                    indexx = null;
                }
            }
            //当for存在
            if (trees.hasOwnProperty('for')) {
                if (typeof (trees.for) === "string") {
                    find(trees.for, "for", false);
                }
            }

        },
        //在文本里找到变量的关键词
        textFindKey(text, key) {
            let reg = new RegExp(`(?<=^|\\s|\\+|-|\\*|\\/|%|\\(|\\?|:|\\[|\\>|\\<|=)(${key})(?=$|\\s|\\.|\\]|\\+|-|\\*|\\/|%|\\(|\\?|:|\\[|\\)|\\>|\\<|=)`, "g");
            return reg.test(text);
        },
        listenTrunk(treex) { //对子元素数组的变化进行监听
            treex.children = new Proxy(treex.children, {
                set(target, property, value) {
                    if (property == 'length') {
                        target[property] = value;
                        return true;
                    }

                    if (value === target[parseInt(property) - 1]) {
                        target[property] = value;
                        return true;
                    }
                    //判断一级子元素是否增加
                    //当检测到不存在这个子元素
                    if (!target[property]) {
                        target[property] = value;
                        //新增子虚拟描述
                        tree.createTrunk(target[property], treex, property);
                        return true;
                    }
                    //当一级子元素改变了
                    //判断自身是否为对象描述
                    if (target[property] instanceof Object) { //子虚拟描述被覆盖 //不允许的操作
                        if (value instanceof Object) {
                            target[property] = value;
                        } else {
                            target[property] = value;
                        }
                    } else {
                        //自身是文本描述时
                        target[property] = value;
                        //修改文本内容
                        const index = parseInt(property);
                        treex.$el.childNodes[index + 1].nodeValue = value;
                    }
                    return true;
                }
            })
        },
        listenTree(treex, description, index_) { //监听虚拟描述自身
            treex.children[index_] = new Proxy(description, {
                set(target, property, value_) {
                    if (property == 'length') {
                        target[property] = value_;
                        return true;
                    }
                    if (/^\$+/.test(property)) {
                        target[property] = value_;
                        return true;
                    }
                    let el = target.$el;
                    let self = target;

                    if (property == "tag") {
                        throw "不可以直接修改子元素的标签名";
                    }
                    let forbear = tree.forbear(self.$lcpid);
                    //判断是不是列表渲染
                    //是列表渲染

                    if (el instanceof Array) {
                        //将记录器清空
                        let manage = {};
                        let manage_ = {};
                        let managex = {};
                        let arrx = [];
                        let objx = {};
                        let data_ = {};
                        let realData = treesRealData[self.$lcpid];
                        if(forbear.data){
                            let key_ = Object.keys(forbear.data);
                            for (let i = 0; i < key_.length; i++) {
                                data_[key_[i]] = forbear.data[key_[i]]
                            }
                        }
                        let class_isArr = value_ instanceof Array;
                        let class_isObj = value_ instanceof Object;
                        let class_obj = Object.keys(value_);
                        let style_isObj = value_ instanceof Object;
                        let style_isArr = value_ instanceof Array;
                        let parent = self.parent();
                        for (let i = 0; i < el.length; i++) {
                            //开始渲染祖元素的真实数据
                            //m是父元素目前所在索引
                            tree.reality(self, arrx, manage, manage_, managex, objx, data_);
                            let m = -1;
                            if (self.for) {
                                m = objx.parent;
                            } else {
                                m = objx.trees;
                            }
                            //判断其他属性被修改，比如v-xx属性或者事件
                            if (property != "tag" && property != "class" && property != "text" && property != "style" && property != "children" && property != "css" && property != "if" && property != "show" && !/^\$+/.test(property)) {

                                //判断是不是事件
                                if (value_ instanceof Function) {
                                    //绑定事件并改变this指向
                                    el[i][property] = value_.bind(self);
                                    self.$other[property] = value_;
                                } else if (typeof (value_) == "string") {
                                    //依赖进行更新
                                    let texts = tree.textParse(value_, true, data_);
                                    el[i].setAttribute(property, texts);
                                    realData[i].other[property] = texts;
                                    self.$other[property] = texts;
                                } else {
                                    el[i].setAttribute(property, value_);
                                    realData[i].other[property] = value_;
                                    self.$other[property] = value_;
                                }
                                target[property] = value_;
                            }
                            //当更改的是text属性时
                            if (property == "text") {
                                let chx = self.children && self.children.length;
                                if (self.text && !chx) {
                                    //依赖进行更新
                                    let texts = tree.textParse(value_, true, data_);
                                    el[i].textContent = texts;
                                    target[property] = value_;
                                    realData[i].text = texts;
                                }
                            }
                            //条件渲染 - 是否渲染该虚拟描述
                            if (property == "if") {
                                //新的if的真假
                                let boole = true;
                                //旧的if的真假
                                let boolex = true;
                                //记录旧的if此时的真假
                                boolex = realData[i].if;

                                //记录新的if此时的真假
                                if (typeof value_ == 'string') {
                                    //依赖进行更新
                                    let data = tree.textParse(value_, false, data_);
                                    boole = data;
                                } else {
                                    boole = value_;
                                }

                                //当之前if为假，新状态为真时
                                if (!boolex && boole) {
                                    realData[i].if = true;
                                    self.$state.if[i] = 1;
                                    //判断父元素是不是列表渲染
                                    let parentEl;
                                    if (m >= 0) {
                                        parentEl = parent.$el[m];
                                    } else {
                                        parentEl = parent.$el;
                                    }
                                    let el = tree.elementFindNext(parentEl, self, i);

                                    if (el) {
                                        parentEl.insertBefore(self.$el[i], el);
                                    } else {
                                        parentEl.appendChild(self.$el[i]);
                                    }
                                }
                                //当之前if为真，新状态为假时
                                if (boolex && !boole) {
                                    realData[i].if = false;
                                    self.$state.if[i] = 0;
                                    self.$el[i].remove();
                                }
                                target[property] = value_;
                            }
                            //对是否显示进行处理
                            if (property == "show") {
                                //之前的show值
                                let boolex = false;
                                //最新的show值
                                let boole = false;
                                //判断旧的show的真假
                                boolex = realData[i].show;
                                //判断新的show的真假
                                //判断show的值是不是字符串
                                if (typeof (value_) === "string") {
                                    //依赖进行更新
                                    let data = tree.textParse(value_, false, data_);
                                    boole = data;
                                } else {
                                    boole = target.show;
                                }

                                //当旧的show是假，新的是真
                                if (!boolex && boole) {
                                    realData[i].show = true;
                                    target.$el[i].style.display = '';
                                }
                                //当旧的show是真，新的是假
                                if (boolex && !boole) {
                                    realData[i].show = false;
                                    target.$el[i].style.display = 'none';
                                }
                                target[property] = value_;
                            }
                            //class进行更新
                            if (property == "class") {
                                //对已有class进行数组化，方便一会部分更新
                                let old_list = realData[i].class;
                                //对修改后的class进行数组化，方便对比
                                let new_list = [];
                                if (class_isArr) {
                                    for (let j = 0; j < value_.length; j++) {
                                        //依赖进行更新
                                        let data = tree.textParse(value_[i], true, data_);
                                        new_list.push(data);
                                    }
                                } else if (class_isObj) {
                                    let key_ = class_obj;
                                    for (let j = 0; j < key_.length; j++) {
                                        if (typeof (value_[key_[j]]) === "string") {
                                            //依赖进行更新
                                            let data = tree.textParse(value_[key_[j]], false, data_);
                                            if (data) {
                                                new_list.push(key_[j]);
                                            }
                                        } else {
                                            if (value_[key_[j]]) {
                                                new_list.push(key_[j]);
                                            }
                                        }
                                    }
                                } else {
                                    let data = tree.textParse(value_, true, data_);
                                    new_list = data.split(" ");
                                }
                                //开始比对，进行一个class更新
                                //对已有的与改后的进行判断，已有的不存在新的里就进行删除
                                for (let k = 0; k < old_list.length; k++) {
                                    if (!new_list.includes(old_list[k])) {
                                        self.$el[i].classList.remove(old_class[k]);
                                        realData[i].class.splice(k, 1);
                                        k--;
                                    }
                                }
                                //对已有的与改后的进行判断，新增的不存在旧的里就新增
                                for (let k = 0; k < new_list.length; k++) {
                                    if (!old_list.includes(new_list[k])) {
                                        self.$el[i].classList.add(new_list[k]);
                                        realData[i].class.push(new_list[k]);
                                    }
                                }

                                if (typeof value_ == 'string') {
                                    target[property] = value_;
                                } else {
                                    target[property] = lcpx.copy(value_);
                                }
                            }
                            //style进行更新
                            if (property == "style") {
                                //初始化style
                                let self_style = self.style ? self.style : {};
                                //新的style
                                let update_style = lcpx.copy(value_);
                                let styles = {};
                                //判断改后style是否为数组类型
                                if (style_isArr) {
                                    for (let i = 0; i < update_style.length; i++) {
                                        if (update_style[i] instanceof Object) {
                                            let key_ = Object.keys(update_style[i]);
                                            for (let j = 0; j < key_.length; j++) {
                                                styles[key_[j]] = update_style[i][key_[j]];
                                            }
                                        }
                                    }
                                    update_style = styles;
                                }
                                //判断改后style是否为对象类型
                                if (style_isObj) {
                                    //是对象就进行对比
                                    //将不存在的旧的进行删除
                                    let key_ = Object.keys(self_style);
                                    for (let j = 0; j < key_.length; j++) {
                                        //当新style上不存在旧style时，删除
                                        if (!update_style[key_[j]]) {
                                            el[i].style[key_[j]] = null;
                                            realData[i].style[key_[j]] = null;
                                        } else
                                            if (update_style[key_[j]] != self_style[key_[j]]) {
                                                //当旧style的值被修改
                                                let data = tree.textParse(update_style[key_[j]], true, data_);
                                                el[i].style[key_[j]] = data;
                                                realData[i].style[key_[j]] = data;
                                            }
                                    }
                                    //新增新的
                                    key_ = Object.keys(update_style);
                                    for (let j = 0; j < key_.length; j++) {
                                        //不存在就新增
                                        if (!self_style[key_[j]]) {
                                            let data = tree.textParse(update_style[key_[j]], true, data_);
                                            el[i].style[key_[j]] = data;
                                            realData[i].style[key_[j]] = data;
                                        }
                                    }
                                } else {
                                    //否则直接改
                                    let data = tree.textParse(update_style, true, data_);
                                    el[i].style = data;
                                    realData[i].style = data;
                                }
                                //对style列表进行监听
                                tree.listenStyle(target, update_style);

                                if (typeof value_ == 'string') {
                                    target[property] = update_style;
                                } else {
                                    target[property] = lcpx.copy(update_style);
                                }

                            }

                        }

                    }
                    //不是列表渲染
                    else {
                        //判断其他属性被修改，比如v-xx属性或者事件
                        if (property != "tag" && property != "class" && property != "text" && property != "style" && property != "children" && property != "css" && property != "if" && property != "show" && !/^\$+/.test(property)) {
                            //判断是不是事件
                            if (value_ instanceof Function) {
                                //绑定事件并改变this指向
                                el[property] = value_.bind(self);
                                self.$other[property] = value_;
                            } else if (typeof (value_) == "string") {
                                //依赖进行更新
                                let texts = tree.textParse(value_, true, data_);
                                el.setAttribute(property, texts);
                                realData[0].other[property] = texts;
                                self.$other[property] = texts;
                            } else {
                                el.setAttribute(property, value_);
                                realData[0].other[property] = value_;
                                self.$other[property] = value_;
                            }
                            target[property] = value_;
                        }
                        //当更改的是text属性时
                        if (property == "text") {
                            let chx = self.children && self.children.length;
                            if (self['text'] && !chx) {
                                //依赖进行更新
                                let texts = tree.textParse(value_, true, data_);
                                el.textContent = texts;
                                target[property] = value_;
                                realData[0].text = texts;
                            }
                        }
                        //条件渲染 - 是否渲染该虚拟描述
                        if (property == "if") {
                            //新的if的真假
                            let boole = false;
                            //旧的if的真假
                            let boolex = false;
                            //记录旧的if此时的真假
                            boolex = realData[0].if;

                            //记录新的if此时的真假
                            if (typeof value_ === 'string') {
                                //依赖进行更新
                                let data = tree.textParse(value_, false, data_);
                                boole = data;
                            } else {
                                boole = value_;
                            }

                            //当之前if为假，新状态为真时
                            if (!boolex && boole) {
                                realData[0].if = true;
                                self.$state.if = true;
                                //判断父元素是不是列表渲染
                                let parentEl = parent.$el;
                                let el = tree.elementFindNext(parentEl, self, 0);
                                if (el) {
                                    parentEl.insertBefore(self.$el, el);
                                } else {
                                    parentEl.appendChild(self.$el);
                                }
                            }
                            //当之前if为真，新状态为假时
                            if (boolex && !boole) {
                                realData[0].if = false;
                                selflf.$state.if = false;
                                self.$el.remove();
                            }
                            target[property] = value_;
                        }
                        //对是否显示进行处理
                        if (property == "show") {
                            //之前的show值
                            let boolex = false;
                            //最新的show值
                            let boole = false;
                            //判断旧的show的真假
                            boolex = realData[0].show;
                            //判断新的show的真假
                            //判断show的值是不是字符串
                            if (typeof (value_) === "string") {
                                //依赖进行更新
                                let data = tree.textParse(value_, false, data_);
                                boolex = data;
                            } else {
                                boolex = target.show;
                            }

                            //当旧的show是假，新的是真
                            if (!boolex && boole) {
                                realData[0].show = true;
                                target.$el.style.display = '';
                            }
                            //当旧的show是真，新的是假
                            if (boolex && !boole) {
                                realData[0].show = false;
                                target.$el.style.display = 'none';
                            }
                            target[property] = value_;
                        }
                        //class进行更新
                        if (property == "class") {
                            //对已有class进行数组化，方便一会部分更新
                            let old_list = realData[0].class;

                            //对修改后的class进行数组化，方便对比
                            let new_list = [];
                            if (class_isArr) {
                                for (let j = 0; j < value_.length; j++) {
                                    //依赖进行更新
                                    let data = tree.textParse(value_[j], true, data_);
                                    new_list.push(data);
                                }
                            } else if (class_isObj) {
                                let key_ = Object.keys(value_);
                                for (let j = 0; j < key_.length; j++) {
                                    if (typeof (value_[key_[j]]) === "string") {
                                        //依赖进行更新
                                        let data = tree.textParse(value_[key_[j]], false, data_);
                                        if (data) {
                                            new_list.push(key_[j]);
                                        }
                                    } else {
                                        if (value_[key_[j]]) {
                                            new_list.push(key_[j]);
                                        }
                                    }
                                }
                            } else {
                                let data = tree.textParse(value_, true, data_);
                                new_list = data.split(" ");
                            }
                            //开始比对，进行一个class更新
                            //对已有的与改后的进行判断，已有的不存在新的里就进行删除
                            for (let k = 0; k < old_list.length; k++) {
                                if (!new_list.includes(old_list[k])) {
                                    self.$el.classList.remove(old_list[k]);
                                    realData[0].class.splice(k, 1);
                                    k--;
                                }
                            }
                            //对已有的与改后的进行判断，新增的不存在旧的里就新增
                            for (let k = 0; k < new_list.length; k++) {
                                if (!old_list.includes(new_list[k])) {
                                    self.$el.classList.add(new_list[k]);
                                    realData[0].class.push(new_list[k]);
                                }
                            }

                            if (typeof value_ == 'string') {
                                target[property] = value_;
                            } else {
                                target[property] = lcpx.copy(value_);
                            }
                        }
                        //style进行更新
                        if (property == "style") {
                            //初始化style
                            let self_style = self.style ? self.style : {};
                            //新的style
                            let update_style = lcpx.copy(value_);
                            let styles = {};
                            //判断改后style是否为数组类型
                            if (style_isArr) {
                                for (let i = 0; i < update_style.length; i++) {
                                    if (update_style[i] instanceof Object) {
                                        let key_ = Object.keys(update_style[i]);
                                        for (let j = 0; j < key_.length; j++) {
                                            styles[key_[j]] = update_style[i][key_[j]];
                                        }
                                    }
                                }
                                update_style = styles;
                            }
                            //判断改后style是否为对象类型
                            if (style_isObj) {
                                //是对象就进行对比
                                //将不存在的旧的进行删除
                                let key_ = Object.keys(self_style);
                                for (let j = 0; j < key_.length; j++) {
                                    //当新style上不存在旧style时，删除
                                    if (!update_style[key_[j]]) {
                                        el.style[key_[j]] = null;
                                        realData[0].style[key_[j]] = null;
                                    } else
                                        if (update_style[key_[j]] != self_style[key_[j]]) {
                                            //当旧style的值被修改
                                            let data = tree.textParse(update_style[key_[j]], true, data_);
                                            el.style[key_[j]] = data;
                                            realData[0].style[key_[j]] = data;
                                        }
                                }
                                //新增新的
                                key_ = Object.keys(update_style);
                                for (let j = 0; j < key_.length; j++) {
                                    //不存在就新增
                                    if (!self_style[key_[j]]) {
                                        let data = tree.textParse(update_style[key_[j]], true, data_);
                                        el.style[key_[j]] = data;
                                        realData[0].style[key_[j]] = data;
                                    }
                                }
                            } else {
                                //否则直接改
                                let data = tree.textParse(update_style, true, data_);
                                el.style = data;
                                realData[0].style = data;
                            }
                            //对style列表进行监听
                            tree.listenStyle(target, update_style);

                            if (typeof value_ == 'string') {
                                target[property] = update_style;
                            } else {
                                target[property] = lcpx.copy(update_style);
                            }
                        }

                    }
                    //对css属性更改时
                    if (property == "css") {
                        let text = value_.replace(/\{lcpid\}/g, "*[v-lcpid='"+target.$lcpid+"']");
                        //当原本没有css时
                        if (!target.css) {
                            let style = document.createElement("style");
                            style.textContent = text;
                            document.head.appendChild(style);
                            target.$css = style;
                            if (target.$el instanceof Array) {
                                for (let i = 0; i < target.$el.length; i++) {
                                    target.$el[i].setAttribute("v-lcpid", target.$lcpid);
                                }
                            } else {
                                target.$el.setAttribute("v-lcpid", target.$lcpid);
                            }
                        } else
                            if (!value_) //当value为空代表删除
                            {
                                document.head.removeChild(target.$css);
                                delete target.css;
                                delete target.$css;
                                if (target.$el instanceof Array) {
                                    for (let i = 0; i < target.$el.length; i++) {
                                        target.$el[i].removeAttribute("v-lcpid");
                                    }
                                } else {
                                    target.$el.removeAttribute("v-lcpid");
                                }

                            } else {
                                target.$css.textContent = text;
                            }
                        target[property] = value_;
                    }

                    return true;
                }
            })
        },
        //对lcpid进行迭代更新
        lcpid(treex) {
            let lcpid = treex.$lcpid;
            if (treex.children) {
                for (let i = 0; i < treex.children.length; i++) {
                    if (treex.children[i] instanceof Object) {
                        let arr = treex.children[i].$lcpid.split('-');
                        treex.children[i].$lcpid = lcpid + '-' + arr[arr.length - 1];
                        //判断子虚拟描述是否绑定了css样式
                        if (treex.children[i].css) {
                            //判断子虚拟描述为列表渲染
                            if (treex.children[i].$el instanceof Array) {
                                for (let j = 0; j < treex.children[i].$el.length; j++) {
                                    treex.children[i].$el[j].setAttribute("v-lcpid", treex.children[i].$lcpid);
                                }
                            }
                            //为普通渲染时
                            else {
                                treex.children[i].$el.setAttribute("v-lcpid", treex.children[i].$lcpid);
                            }
                            treex.children[i].css = treex.children[i].css;
                        }
                        //对子虚拟描述进行lcpid
                        tree.lcpid(treex.children[i]);
                    }
                }
            }
        },
        //找到同父元素下的下一个兄弟元素
        elementFindNext(m, self, k) {
            if (self.$el instanceof Array) {
                for (let j = k; j < self.$el.length; j++) {
                    if (self.$state.if[j] && !self.$defer && self.$state.parent[j] == m) {
                        return self.$el[j];
                    }
                }
            } else {
                if (self.$state.if && !self.$defer && self.$state.parent == m) {
                    return self.$el;
                }
            }

            let next = self.nextElementSibling();
            if (next) {
                return this.elementFindNext(m, next, 0);
            } else {
                return false;
            }

        },
        //列表循环的索引状态管理
        manage: {},
        //列表循环的索引长度状态管理
        manage_: {},
        //将父元素的列表渲染数据与关键词进行绑定
        reality(treex, arr, manage, manage_, objx, managex, data) {
            if (!objx) {
                objx = {};
            }

            let j = 0;
            if (arr.length == 0) {
                let lcpid = treex.$lcpid;
                let arrx = lcpid.split('-');

                for (let i = 2; i <= arrx.length; i++) {
                    let lcpid2 = arrx.slice(0, i).join('-');
                    let self = tree.query(lcpid2);
                    if (self.for) {
                        arr.push(self);
                    }
                }
                objx.data = window.$lcpid[arrx[0]].data;
                this.reality(treex, arr, manage, manage_, objx, managex, data);
            }

            else {
                let changex = false;

                for (let i = 0; i < arr.length; i++) {
                    if (!managex[arr[i].$lcpid]) {
                        managex[arr[i].$lcpid] = {};
                    }
                    if (!manage[arr[i].$lcpid]) {
                        changex = true;
                    }
                    if (!changex) {
                        if (i != arr.length - 1 && arr.length > 1) {
                            if (managex[arr[i].$lcpid].index != manage[arr[i].$lcpid]) {
                                changex = true;
                            }
                        }
                    }

                    if (changex) {

                        if (!manage[arr[i].$lcpid]) {
                            j = 0;
                            manage[arr[i].$lcpid] = 0;
                        } else {
                            j = manage[arr[i].$lcpid];
                        }
                        managex[arr[i].$lcpid].index = j;
                        if (arr[i].$index) {
                            data[arr[i].$index] = j;
                        } else {
                            data.index = j;
                        }
                        let length = 0;
                        //数据源是数组时
                        if (arr[i].for instanceof Array) {
                            length = arr[i].for.length;
                            if (arr[i].$value) {
                                data[arr[i].$value] = arr[i].for[j];
                            } else {
                                data.value = arr[i].for[j];
                            }
                            managex[arr[i].$lcpid].for = arr[i].for;
                        }

                        //数据源是对象时
                        else if (arr[i].for instanceof Object) {
                            managex[arr[i].$lcpid].for = arr[i].for;
                            let key_ = Object.keys(arr[i].for);
                            for (let x = 0; x < key_.length; x++) {
                                if (x == j) {
                                    if (arr[i].$value) {
                                        data[arr[i].$value] = arr[i].for[key_[x]];
                                    } else {
                                        data.value = arr[i].for[key_[x]];
                                    }
                                    if (arr[i].$key) {
                                        data[arr[i].$key] = key_[x];
                                    } else {
                                        data.key = key_[x];
                                    }
                                    break;
                                }
                            }
                            length = key_.length;
                        }

                        //数据源是字符串时
                        else if (typeof (arr[i].for) === "string") {
                            let render = tree.textParse(arr[i].for, false, data);
                            managex[arr[i].$lcpid].for = render;
                            //数据源是数组时
                            if (render instanceof Array) {
                                length = render.length;
                                if (arr[i].$value) {
                                    data[arr[i].$value] = render[j];
                                } else {
                                    data.value = render[j];
                                }
                            }

                            //数据源是对象时
                            else if (render instanceof Object) {
                                let key_ = Object.keys(render);
                                for (let k = 0; k < key_.length; k++) {
                                    if (k == j) {
                                        if (arr[i].$value) {
                                            data[arr[i].$value] = render[key_[k]];
                                        } else {
                                            data.value = render[key_[k]];
                                        }
                                        if (arr[i].$key) {
                                            data[arr[i].$key] = key_[k];
                                        } else {
                                            data.key = key_[k];
                                        }
                                        break;
                                    }
                                }
                                length = key_.length;
                            }

                            //数据源是字符串时
                            else if (typeof (render) === "string") {
                                if (arr[i].$value) {
                                    data[arr[i].$value] = render;
                                } else {
                                    data.value = render;
                                }
                                length = 1;
                            }

                        }

                        manage_[arr[i].$lcpid] = length;
                    } else {
                        if (i == arr.length - 1) {
                            managex[arr[i].$lcpid].index++;
                        }
                        if (arr[i].$index) {
                            data[arr[i].$index] = managex[arr[i].$lcpid].index;
                        } else {
                            data.index = managex[arr[i].$lcpid].index;
                        }
                        if (managex[arr[i].$lcpid].for instanceof Array) {
                            if (arr[i].$value) {
                                data[arr[i].$value] = managex[arr[i].$lcpid].for[managex[arr[i].$lcpid].index];
                            } else {
                                data.value = managex[arr[i].$lcpid].for[managex[arr[i].$lcpid].index];
                            }
                        } else if (managex[arr[i].$lcpid].for instanceof Object) {
                            let key_ = Object.keys(managex[arr[i].$lcpid].for);
                            if (arr[i].$value) {
                                data[arr[i].$value] = managex[arr[i].$lcpid].for[key_[managex[arr[i].$lcpid].index]];
                            } else {
                                data.value = managex[arr[i].$lcpid].for[key_[managex[arr[i].$lcpid].index]];
                            }
                            if (arr[i].$key) {
                                data[arr[i].$key] = key_[managex[arr[i].$lcpid].index];
                            } else {
                                data.key = key_[managex[arr[i].$lcpid].index];
                            }
                        } else {
                            if (arr[i].$value) {
                                data[arr[i].$value] = managex[arr[i].$lcpid].for;
                            } else {
                                data.value = managex[arr[i].$lcpid].for;
                            }
                        }
                    }

                    if (i == arr.length - 1) {
                        if (i > 0) {
                            objx.trees = manage[arr[i].$lcpid];
                            objx.parent = manage[arr[i - 1].$lcpid];
                            objx.parentLength = manage_[arr[i].$lcpid];
                        } else {
                            objx.trees = manage[arr[i].$lcpid];
                            objx.parentLength = manage_[arr[i].$lcpid];
                        }
                        manage[arr[i].$lcpid]++;
                        objx.arr = arr;
                        if (manage[arr[i].$lcpid] == manage_[arr[i].$lcpid]) {
                            manage[arr[i].$lcpid] = 0;
                            if (arr.length > 1) {
                                manage[arr[i - 1].$lcpid]++;
                            }
                            if (arr.length > 1) {
                                for (let j = arr.length - 2; j >= 0; j--) {
                                    if (manage[arr[j].$lcpid] == manage_[arr[j].$lcpid]) {
                                        manage[arr[j].$lcpid] = 0;
                                        if (j > 0) {
                                            manage[arr[j - 1].$lcpid]++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }

        },
        updateForList(trees, p, val) {
            let forbear = tree.forbear(trees.$lcpid);
            //开始数据更新
            //取依赖自身列表渲染的元素
            let forList = trees.$forList;
            let key_ = Object.keys(forList);
            for (let i = 0; i < key_.length; i++) {

                if (forList[key_[i]] instanceof Array && forList[key_[i]].length > 0) {

                    let self = tree.query(key_[i]);
                    let parent = self.parent();
                    //依赖项目列表
                    if (forList[key_[i]].includes("for")) {
                        this.updateForList(self, p, val);
                    }
                    //for依赖时
                    //记载器清空
                    let manage = {};
                    let manage_ = {};
                    let managex = {};
                    let arrx = [];
                    let objx = {};
                    //show是否存在
                    let show_if = self.hasOwnProperty("show");
                    //if是否存在
                    let if_if = self.hasOwnProperty("if");
                    let class_isArr = self.class instanceof Array;
                    let class_isObj = self.class instanceof Object;
                    let style_isObj = self.style instanceof Object;
                    let style_obj, class_obj, other_obj;
                    if (style_isObj) {
                        style_obj = Object.keys(self.style);
                    }
                    if (class_isObj) {
                        class_obj = Object.keys(self.class);
                    }
                    if (self.$other) {
                        other_obj = Object.keys(self.$other);
                    }
                    let data = {};
                    if(forbear.data){
                    let keyx_ = Object.keys(forbear.data);
                    for (let i = 0; i < keyx_.length; i++) {
                        data[keyx_[i]] = forbear.data[keyx_[i]]
                    }
                }
                    let realData = treesRealData[key_[i]];
                    for (let l = 0; l < self.$el.length; l++) {
                        //对数据进行更新
                        let realData_ = realData[l];
                        tree.reality(self, arrx, manage, manage_, objx, managex, data);

                        let m = -1;
                        if (self.for && parent.$for) {
                            m = objx.parent;
                        } else {
                            m = objx.trees;
                        }
                        if (!parent.$for) {
                            m = -1;
                        }
                        let tag = self.$el[l];
                        //对依赖列表进行一个遍历
                        for (let k = 0; k < forList[key_[i]].length; k++) {
                            let rely = forList[key_[i]][k];
                            //text依赖这个data数据时
                            if (rely == "text") {
                                let chx = self.children && self.children.length;
                                if (self['text'] && !chx) {
                                    //取最新的数据
                                    let new_text = tree.textParse(self.text, true, data);
                                    if (realData_.text != new_text) {
                                        tag.textContent = new_text;
                                        realData_.text = new_text;
                                    }
                                }

                            }
                            //其他属性依赖这个data数据时
                            if (rely == "other") {
                                //数据更新
                                //对其他属性进行循环遍历
                                if (self.$other) {
                                    let key_ = other_obj;
                                    let new_obj = {};
                                    for (let k = 0; k < key_.length; k++) {
                                        if (typeof (self.$other[key_[k]]) === "string") {
                                            let value_ = tree.textParse(self.$other[key_[k]], true, data);
                                            new_obj[key_[k]] = value_;
                                        }
                                    }

                                    let old_obj = realData_.other;

                                    for (let k = 0; k < key_.length; k++) {
                                        if (old_obj[key_[k]] != new_obj[key_[k]]) {
                                            tag.setAttribute(key_[k], new_obj[key_[k]]);
                                            realData_.other[key_[k]] = new_obj[key_[k]];
                                        }
                                    }


                                }

                            }
                            //class属性依赖这个data数据时
                            if (rely == "class") {
                                //对class属性进行遍历
                                let classx = self.class;
                                //先记录之前的真实class列表
                                let new_list = [];
                                if (classx) {
                                    if (class_isArr) {
                                        for (let k = 0; k < classx.length; k++) {
                                            let value_ = tree.textParse(classx[k], true, data);
                                            new_list.push(value_);
                                        }
                                    } else if (class_isObj) {
                                        let key_ = class_obj;
                                        for (let k = 0; k < key_.length; k++) {
                                            if (typeof (classx[key_[k]]) === "string") {
                                                let value_ = tree.textParse(classx[key_[k]], false, data);
                                                if (value_) {
                                                    new_list.push(key_[k]);
                                                }
                                            } else {
                                                if (classx[key_[k]]) {
                                                    new_list.push(key_[k]);
                                                }
                                            }
                                        }
                                    } else {
                                        let value_ = tree.textParse(classx, true, data);
                                        new_list = value_.split(' ');
                                    }
                                }

                                //再记录旧的
                                let old_list = realData_.class;
                                //数据更新
                                //将不包含最新的进行删除
                                for (let k = 0; k < old_list.length; k++) {
                                    if (!new_list.includes(old_list[k])) {
                                        tag.classList.remove(old_list[k]);
                                        realData_.class.splice(k, 1);
                                        k--;
                                    }
                                }
                                //将新增的进行添加
                                for (let k = 0; k < new_list.length; k++) {
                                    if (!old_list.includes(new_list[k])) {
                                        tag.classList.add(new_list[k]);
                                        realData_.class.push(new_list[k]);
                                    }
                                }

                            }
                            //style属性依赖这个data数据时
                            if (rely == "style") {
                                //将之前的style读取并记录
                                let new_obj = {};
                                if (style_isObj) {
                                    let key_ = style_obj;
                                    for (let k = 0; k < key_.length; k++) {
                                        let data = tree.textParse(self.style[key_[k]], true, data);
                                        new_obj[key_[k]] = data;
                                    }
                                } else {
                                    new_style = tree.textParse(trees.style, true, data);
                                }

                                let old_obj = realData_.style;
                                //当style是对象时
                                if (style_isObj) {
                                    //将旧的与新的比对，不一样就改
                                    let key_ = style_obj;
                                    for (let k = 0; k < key_.length; k++) {
                                        if (old_obj[key_[k]] != new_obj[key_[k]]) {
                                            tag.style[key_[k]] = new_obj[key_[k]];
                                            realData_.style[key_[k]] = new_obj[key_[k]];;
                                        }
                                    }
                                }
                                //是字符串时
                                else {
                                    if (new_style != old_style) {
                                        tag.style = new_style;
                                        realData_.style = new_style;
                                    }
                                }

                            }
                            //show属性依赖这个data数据时
                            if (rely == "show") {
                                //最新的show状态
                                let boolex = true;
                                //之前的show状态
                                let boole = true;
                                //获取之前show的状态
                                if (show_if) {
                                    if (typeof (self.show) == "string") {
                                        let data = tree.textParse(self.show, false, data);
                                        boolex = data;
                                    } else {
                                        boolex = self.show;
                                    }
                                }

                                boole = realData_.show;

                                //之前的是假，最新的是真
                                if (!boole && boolex) {
                                    tag.style.display = "";
                                    realData_.show = true;
                                }
                                //之前的是真，最新的是假
                                if (boole && !boolex) {
                                    tag.style.display = "none";
                                    realData_.show = false;
                                }

                            }
                            //if属性依赖这个data数据时
                            if (rely == "if") {
                                //最新的if状态
                                let boolex = true;
                                //之前的if状态
                                let boole = true;
                                //获取之前show的状态
                                if (if_if) {
                                    if (typeof (self.if) == "string") {
                                        let data_ = tree.textParse(self.if, false, data);
                                        boolex = data_;
                                    } else {
                                        boolex = self.if;
                                    }
                                }

                                boole = realData_.if;

                                //之前的是假，最新的是真
                                if (!boole && boolex) {
                                    realData_.if = true;
                                    //判断父元素是不是列表渲染
                                    let parentEl;
                                    if (m >= 0) {
                                        parentEl = parent.$el[m];
                                    } else {
                                        parentEl = parent.$el;
                                        m = 0;
                                    }

                                    let el = tree.elementFindNext(m, self, l);

                                    if (el) {
                                        parentEl.insertBefore(tag, el);
                                    } else {
                                        parentEl.appendChild(tag);
                                    }
                                    if (self.$el instanceof Array) {
                                        self.$state.if[l] = 1;
                                    } else {
                                        self.$state.if = 1;
                                    }

                                }
                                //之前的是真，最新的是假
                                if (boole && !boolex) {
                                    realData_.if = false;
                                    tag.remove();
                                    if (self.$el instanceof Array) {
                                        self.$state.if[l] = 0;
                                    } else {
                                        self.$state.if = 0;
                                    }
                                }
                            }
                        }


                    }

                }
            }
        },
        //对依赖data数据的树进行更新
        updateTree(treex, p, val) {
            let forbear = treex;
            let obj = treex.listenDataList[p];
            //对依赖的所有树进行遍历
            let keys_ = Object.keys(obj);
            for (let i = 0; i < keys_.length; i++) {
                let key_ = keys_[i];
                let lcpid = key_;
                let arr = obj[key_];
                let trees = tree.query(lcpid);
                let parent = trees.parent();
                let tag = trees.$el;
                let show_if = trees.hasOwnProperty("show");
                let if_if = trees.hasOwnProperty("if");
                let class_isArr = trees.class instanceof Array;
                let class_isObj = trees.class instanceof Object;
                let style_isObj = trees.style instanceof Object;
                let style_isArr = trees.style instanceof Array;
                let style_obj, class_obj, other_obj;
                if (style_isObj) {
                    style_obj = Object.keys(trees.style);
                }
                if (class_isObj) {
                    class_obj = Object.keys(trees.class);
                }
                if (trees.$other) {
                    other_obj = Object.keys(trees.$other);
                }
                let state = {
                    show_if: show_if,
                    if_if: if_if,
                    class_isArr: class_isArr,
                    class_isObj: class_isObj,
                    style_isArr: style_isArr,
                    style_isObj: style_isObj,
                    style_obj: style_obj,
                    class_obj: class_obj,
                    other_obj: other_obj,
                    parent: trees.parent()
                };
                let data = {};
                if(forbear.data){
                let keyx_ = Object.keys(forbear.data);

                for (let j = 0; j < keyx_.length; j++) {
                    data[keyx_[j]] = forbear.data[keyx_[j]]
                }
            }
                //判断树是不是列表循环
                if (trees.$for) {

                    //for属性依赖这个data数据时
                    if (arr.includes("for")) {

                        //判断祖元素是不是列表循环
                        if (parent.$el instanceof Array) {
                            //记载器进行清空
                            let manage = {};
                            let manage_ = {};
                            let managex = {};
                            //记录最新渲染源的长度
                            let length = 0;
                            let arrx = [];
                            let objx = {};

                            for (let j = 0; j < parent.$el.length; j++) {
                                //渲染列表循环的数据
                                tree.reality(parent, arrx, manage, manage_, objx, managex, data);
                                if (typeof (trees.for) == "string") {

                                    let render = tree.textParse(trees.for, false, data);
                                    //新的渲染源是数组时
                                    if (render instanceof Array) {
                                        length += render.length;
                                    }
                                    //新的渲染源是对象时
                                    else if (render instanceof Object) {
                                        length += Object.keys(render).length;
                                    }
                                    //新的渲染源是字符串时
                                    else if (typeof (render) == "string") {
                                        length++;
                                    }
                                }
                            }
                            //当新的数量大于之前的数量
                            if (length > trees.$el.length) {
                                let length2 = trees.$el.length;
                                for (let k = trees.$el.length; k < length; k++) {
                                    let tags;
                                    if (trees.tag == "text") {
                                        tags = document.createTextNode("");
                                    } else {
                                        tags = document.createElement(trees.tag);
                                    }
                                    trees.$el.push(tags);
                                }
                                let defer = tree.renderTrunk(trees, length2, true, obj);
                                defer.$defer = false;
                                tree.treesRejoin(defer);
                            }
                            //当新的数量小于之前的数量 进行删除
                            if (length < trees.$el.length) {
                                for (let k = length; k < trees.$el.length; k++) {
                                    trees.$el[k].remove();
                                }
                                trees.$el = trees.$el.slice(0, length);
                                trees.$state.parent = trees.$state.parent.slice(0, length);
                                trees.$state.if = trees.$state.if.slice(0, length);
                                treesRealData[trees.$lcpid] = treesRealData[trees.$lcpid].slice(0, length);
                                if(length > 0){
                                    tree.childRejoin(trees);
                                }else{
                                    tree.childRejoin(trees,true);
                                }
                                    
                            }
                            //对依赖自身列表渲染的数据进行更新
                            tree.updateForList(trees, p, val);
                        }
                        //祖元素不是列表循环
                        else {

                            if (typeof (trees.for) == "string") {

                                let render = tree.textParse(trees.for, false, data);
                                //记录最新渲染源的长度
                                let length = 1;

                                //新的渲染源是数组时
                                if (render instanceof Array) {
                                    length = render.length;
                                }
                                //新的渲染源是对象时
                                else if (render instanceof Object) {
                                    length = Object.keys(render).length;
                                }

                                //对el进行删除或新增
                                //当新的数量大于之前的数量
                                if (length > trees.$el.length) {
                                    let length2 = trees.$el.length;
                                    for (let k = trees.$el.length; k < length; k++) {
                                        let tags;
                                        if (trees.tag == "text") {
                                            tags = document.createTextNode("");
                                        } else {
                                            tags = document.createElement(trees.tag);
                                        }
                                        trees.$el.push(tags);
                                    }
                                    let defer = tree.renderTrunk(trees, length2, true);
                                    defer.$defer = false;
                                    tree.treesRejoin(defer);
                                }
                                //当新的数量小于之前的数量 进行删除
                                if (length < trees.$el.length) {
                                    for (let k = length; k < trees.$el.length; k++) {
                                        trees.$el[k].remove();
                                    }
                                    trees.$el = trees.$el.slice(0, length);
                                    trees.$state.parent = trees.$state.parent.slice(0, length);
                                    trees.$state.if = trees.$state.if.slice(0, length);
                                    treesRealData[trees.$lcpid] = treesRealData[trees.$lcpid].slice(0, length);
                                    if(length > 0){
                                        tree.childRejoin(trees);
                                    }else{
                                        tree.childRejoin(trees,true);
                                    }
                                }

                                //对依赖自身列表渲染的数据进行更新
                                tree.updateForList(trees, p, val);
                            }
                        }

                    }
                    //记载器进行清空
                    let manage = {};
                    let manage_ = {};
                    let managex = {};
                    let arrx = [];
                    let objx = {};
                    let data_ = {};
                    if(forbear.data){
                    let keyx_ = Object.keys(forbear.data);
                    for (let j = 0; j < keyx_.length; j++) {
                        data_[keyx_[j]] = forbear.data[keyx_[j]]
                    }
                }
                    for (let j = 0; j < tag.length; j++) {
                        //渲染列表循环的数据
                        tree.reality(trees, arrx, manage, manage_, objx, managex, data_);

                        let m = -1;
                        if (trees.for && parent.$for) {
                            m = objx.parent;
                        } else {
                            m = objx.trees;
                        }
                        if (!parent.$for) {
                            m = -1;
                        }
                        tree.treesUpdate(trees, arr, j, m, state, data_);
                    }

                }
                //不是列表循环
                else {
                    tree.treesUpdate(trees, arr, 0, -1, state, data);
                }


            }

        },
        //虚拟描述的内容更新校正
        treesUpdate(trees, arr, j, m, state, data) {
            let tag = trees.$el;
            let realData = treesRealData[trees.$lcpid][0];
            if (trees.$for) {
                tag = tag[j];
                realData = treesRealData[trees.$lcpid][j];
            }
            for (let i = 0; i < arr.length; i++) {
                //text依赖这个data数据时
                if (arr[i] == "text") {
                    let chx = trees.children && trees.children.length;
                    if (trees['text'] && !chx) {
                        //取之前的真实数据
                        let text = realData.text;
                        //取最新的数据
                        let new_text = tree.textParse(trees.text, true, data);
                        //数据更新
                        if (text != new_text) {
                            tag.textContent = new_text;
                            realData.text = new_text;
                        }
                    }

                }
                //其他属性依赖这个data数据时
                if (arr[i] == "other") {
                    //数据更新
                    //对其他属性进行循环遍历
                    if (trees.$other) {
                        let key_ = state.other_obj;
                        for (let k = 0; k < key_.length; k++) {
                            if (typeof (trees.$other[key_[k]]) === "string") {
                                //取旧数据
                                let value_ = realData.other[key_[k]];
                                let new_value_ = tree.textParse(trees.$other[key_[k]], true, data);
                                if (value_ != new_value_) {
                                    tag.setAttribute(key_[k], value_);
                                    realData.other[key_[k]] = value_;
                                }
                            }
                        }
                    }

                }
                //class属性依赖这个data数据时
                if (arr[i] == "class") {
                    //对class属性进行遍历
                    let classx = trees.class;
                    //先记录之前的真实class列表

                    if (classx) {
                        let old_list = realData.class;
                        //再记录最新的真实class列表
                        let new_list = [];
                        if (classx) {
                            if (state.class_isArr) {
                                for (let k = 0; k < classx.length; k++) {
                                    let value_ = tree.textParse(classx[k], true, data);
                                    new_list.push(value_);
                                }
                            } else if (state.class_isObj) {
                                let key_ = state.class_obj;
                                for (let k = 0; k < key_.length; k++) {
                                    if (typeof (classx[key_[k]]) === "string") {
                                        let value_ = tree.textParse(classx[key_[k]], false, data);
                                        if (value_) {
                                            new_list.push(key_[k]);
                                        }
                                    } else {
                                        if (classx[key_[k]]) {
                                            new_list.push(key_[k]);
                                        }
                                    }
                                }
                            } else {
                                let value_ = tree.textParse(classx, true, data);
                                new_list = value_.split(' ');
                            }
                        }

                        //数据更新
                        //将不包含最新的进行删除
                        for (let k = 0; k < old_list.length; k++) {
                            if (!new_list.includes(old_list[k])) {
                                tag.classList.remove(old_list[k]);
                                realData.class.splice(k, 1);
                                k--;
                            }
                        }
                        //将新增的进行添加
                        for (let k = 0; k < new_list.length; k++) {
                            if (!old_list.includes(new_list[k])) {
                                tag.classList.add(new_list[k]);
                                realData.class.push(new_list[k]);
                            }
                        }
                    }

                }
                //style属性依赖这个data数据时
                if (arr[i] == "style") {
                    //将之前的style读取并记录
                    let old_obj = realData.style;
                    //将最新的style读取并记录
                    let new_obj = {};
                    if (state.style_isObj) {
                        let key_ = state.style_obj;
                        for (let k = 0; k < key_.length; k++) {
                            let data_ = tree.textParse(trees.style[key_[k]], true, data);
                            new_obj[key_[k]] = data_;
                        }
                    } else {
                        new_obj = tree.textParse(trees.style, true, data);
                    }
                    //当style是对象时
                    if (state.style_isObj) {
                        //将旧的与新的比对，不一样就改
                        let key_ = state.style_obj;
                        for (let k = 0; k < key_.length; k++) {
                            if (old_obj[key_[k]] != new_obj[key_[k]]) {
                                tag.style[key_[k]] = new_obj[key_[k]];
                                realData.style[key_[k]] = new_obj[key_[k]];
                            }
                        }
                    }
                    //是字符串时
                    else {
                        if (new_style != old_style) {
                            tag.style = new_style;
                            realData.style = new_style;
                        }
                    }

                }
                //show属性依赖这个data数据时
                if (arr[i] == "show") {

                    //之前的show状态
                    let boolex = true;
                    //最新的show状态
                    let boole = true;
                    //获取之前show的状态
                    boolex = realData.show;

                    //获取最新show的状态
                    if (state.show_if) {
                        if (typeof (trees.show) == "string") {
                            let data = tree.textParse(trees.show, false, data);
                            boole = data;
                        }
                    }
                    //之前的是假，最新的是真
                    if (!boolex && boole) {
                        tag.style.display = "";
                        realData.show = true;
                    }
                    //之前的是真，最新的是假
                    if (boolex && !boole) {
                        tag.style.display = "none";
                        realData.show = false;
                    }

                }
                //if属性依赖这个data数据时
                if (arr[i] == "if") {
                    //之前的if状态
                    let boolex = realData.if;
                    //最新的if状态
                    let boole = true;
                    //获取最新show的状态
                    if (state.if_if) {
                        if (typeof (trees.if) == "string") {
                            let data = tree.textParse(trees.if, false, data);
                            boole = data;
                        }
                    }
                    //之前的是假，最新的是真
                    if (!boolex && boole) {
                        realData.if = true;
                        let parent = state.parent;
                        //判断父元素是不是列表渲染
                        let parentEl;
                        if (m >= 0) {
                            parentEl = parent.$el[m];
                        } else {
                            parentEl = parent.$el;
                            m = 0;
                        }

                        let el = tree.elementFindNext(m, trees, j);

                        if (el) {
                            parentEl.insertBefore(tag, el);
                        } else {
                            parentEl.appendChild(tag);
                        }
                        if (trees.$for) {
                            trees.$state.if[j] = 1;
                        } else {
                            trees.$state.if = 1;
                        }

                    }
                    //之前的是真，最新的是假
                    if (boolex && !boole) {
                        realData.if = false;
                        tag.remove();
                        if (trees.$for) {
                            trees.$state.if[j] = 0;
                        } else {
                            trees.$state.if = 0;
                        }
                    }

                }
            }

        }
        ,
        listenStyle(treex, description) { //监听style属性
            treex.style = new Proxy(description, {
                set(target, property, value) {
                    target[property] = value;
                    if (property == 'length') {
                        return true;
                    }
                    treex.$el.style[property] = value;
                    return true;
                }
            })
        },
        listenData(treex) {
            let data = treex.data;
            let datas = Object.keys(data);
            for (let i = 0; i < datas.length; i++) {
                let key = datas[i];
                if (data[key] instanceof Array || data[key] instanceof Object) {
                    if(!Object.isFrozen(data[key])){
                        this.listenDatas(data,key, key,treex);
                    }
                    
                }
            }
            treex.$load = false;
        },
        //不停的遍历，并监听
        listenDatas(data,p, key,treex) {
            this.proxy(data,p, {
                set(target, prop, val) {
                    if(!treex.$load){
                        if (treex.listenDataList[key] instanceof Object) {
                            target[prop] = val;
                            tree.updateTree(treex, key, val);
                        }
                    }
                    target[prop] = val;
                    return true;
                }
            });
            if (data[p] instanceof Array) {
                for (let i = 0; i < data[p].length; i++) {
                    if (data[p][i] instanceof Array || data[p][i] instanceof Object) {
                        if(!Object.isFrozen(data[p][i])){
                            this.listenDatas(data[p],i, key,treex);
                        } 
                    }
                }
            } else {
                let key_ = Object.keys(data[p]);
                for (let i = 0; i < key_.length; i++) {
                    if (data[p][key_[i]] instanceof Array || data[p][key_[i]] instanceof Object) {
                        if(!Object.isFrozen(data[p][key_[i]])){
                            this.listenDatas(data[p],key_[i], key,treex);
                        }
                    }
                }
            }
        },
        proxy(data,p, obj) {
            data[p] = new Proxy(data[p], obj);
        }
    }

    function createAPP(obj) {
        let this_ = {};
        //判断传过来的el是不是文本
        if (typeof obj.el == 'string') {
            this_.$el = document.querySelector(obj.el);
        } else {
            this_.$el = obj.el;
        }
        this_.listenDataList = {};
        this_.$load = true;
        //对data的数据进行数据双向绑定
        if (obj.data instanceof Object) {
            this_.data = new Proxy(obj.data, {
                set(target, p, newValue) {
                    if (p == "length") {
                        target[p] = newValue;
                        return true;
                    }
                    //数据进行更新
                    //有元素依赖这个数据时
                    if(!this_.$load){
                        if (this_.listenDataList[p] instanceof Object) {
                            target[p] = newValue;
                            tree.updateTree(this_, p, newValue);
                        }
                    }
                    
                    target[p] = newValue;
                    return true;
                }
            })
        }
        //对data数据进行深层次的监听
        if(this_.data){
            tree.listenData(this_);
        }
        
        //对子元素进行深copy
        if (!obj.children) {
            this_.children = [];
        } else {
            this_.children = lcpx.copy(obj.children);
        }
        //将this记录到虚拟id列表上
        let i = window.$lcpid.push(this_);
        //将虚拟id绑定到父元素上
        //this.$el.setAttribute("v-lcpid", i - 1);
        this_.$lcpid = i - 1;
        this_.$index_ = i - 1;
        //记录数据绑定的源头，使数据更新的更精准
        if(this_.data){
            let key_ = Object.keys(this_.data);
            for (let i = 0; i < key_.length; i++) {
                this_.listenDataList[key_[i]] = {};
            }
        }
        
        //记录树干的自定义列表循环关键词
        this_.forKeyList = {
            value: {},
            key: {},
            index: {}
        }
        //对子元素进行初始渲染

        let defers = [];
        for (let i = 0; i < this_.children.length; i++) {
            defers.push(tree.createTrunk(this_.children[i], this_, i, 0, true));
        }
        //进行渲染
        let frag = document.createDocumentFragment();
        for (let i = 0; i < defers.length; i++) {
            //是列表循环
            if (defers[i].$el instanceof Array) {
                for (let j = 0; j < defers[i].$el.length; j++) {
                    if (defers[i].$state.if[j]) {
                        frag.appendChild(defers[i].$el[j]);
                    }
                }
            } else {
                if (defers[i].$state.if) {
                    frag.appendChild(defers[i].$el);
                }
            }
            defers[i].$defer = false;
        }

        this_.$el.appendChild(frag);


        //对Lcp实例子元素变化进行监听
        tree.listenTrunk(this_);
        //规定用这个方法来添加子元素
        this_.appendChild = function (obj) {
            let i = this.children.push(lcpx.copy(obj));
            return this.children[i - 1];
        }
        //删除自身
        this_.remove = function () {
            this.$el.remove();
            window.$lcpid.splice(i - 1, 1);
            tree.destory(this);
            //对该子对象的接下来的兄弟元素进行更新lcpid
            for (let i = i - 1; i < window.$lcpid.length; i++) {
                //如果接下来的兄弟元素是对象
                if (window.$lcpid[i] instanceof Object) {
                    //对lcpid进行更新组装
                    let arr = window.$lcpid[i].$lcpid.split('-');
                    window.$lcpid[i].$index_--;
                    arr[arr.length - 1] = window.$lcpid[i].$index_;
                    //对lcpid进行更新
                    window.$lcpid[i].$lcpid = arr.join('-');
                    //对子元素的lcpid进行更新
                    tree.lcpid(window.$lcpid[i]);
                }
            }

        }
        //规定用这个方法来删除子元素
        this_.removeChild = function (obj) {
            if (obj instanceof Object) {
                obj.remove();
            }
        }
        //将children属性修改为不可修改
        Object.defineProperty(this_, "children", {
            writable: false
        })
        return this_;
    }
    return { createAPP }
})();

/*
class lcpShadow extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' });
        let span = document.createElement("span");
        span.innerText = "hello lcpjs!";
        shadow.appendChild(span);
    }
}
customElements.define("lcp-js", lcpShadow);*/

//Lcpx是构建组件工具
const lcpx = {
    text(arr) {
        let obj = {};
        if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        } else if (typeof (arr) == "string") {
            obj.text = arr;
        }
        obj.tag = 'text';
        return obj;
    },
    span(arr) {
        let obj = {};
        obj.tag = 'span';
        if (arr instanceof Array) {
            obj.children = arr;
        } else if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        } else {
            obj.text = arr;
        }
        obj.style = {};
        return obj;
    },
    button(arr) {
        let obj = {};
        if (arr instanceof Array) {
            obj.children = arr;
        } else if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        } else {
            obj.text = arr;
        }
        obj.tag = 'button';
        obj.style = {};
        return obj;
    },
    div(arr) {
        let obj = {};
        obj.tag = 'div';
        if (arr instanceof Array) {
            obj.children = arr;
        } else if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        } else {
            obj.text = arr;
        }
        obj.style = {};
        return obj;
    },
    input(arr) {
        let obj = {};
        obj.tag = 'input';
        if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        } else {
            obj.text = arr;
        }
        obj.style = {};
        return obj;
    },
    img(arr) {
        let obj = {};
        obj.tag = 'img';
        if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        } else {
            obj.text = src;
        }
        obj.style = {};
        return obj;
    },
    checkbox(arr) {
        let obj = {};
        obj.tag = 'input';
        if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        }
        obj.type = 'checkbox';
        obj.style = {};
        return obj;
    },
    radio(arr) {
        let obj = {};
        obj.tag = 'input';
        obj.type = 'radio';
        if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        }
        obj.style = {};
        return obj;
    },
    file(arr) {
        let obj = {};
        obj.tag = 'input';
        obj.type = 'file';
        if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        }
        obj.style = {};
        return obj;
    },
    audio(arr) {
        let obj = {};
        obj.tag = 'audio';
        obj.controls = 'controls';
        if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        } else {
            obj.text = src;
        }
        obj.style = {};
        return obj;
    },
    video(arr) {
        let obj = {};
        obj.tag = 'video';
        obj.controls = 'controls';
        if (arr instanceof Object) {
            for (let key in arr) {
                obj[key] = arr[key]
            }
        } else {
            obj.text = src;
        }
        obj.style = {};
        return obj;
    },
    //深拷贝函数
    copy(obj) {
        let newObj = null;
        if (obj instanceof Array) {
            newObj = [];
            for (let i = 0; i < obj.length; i++) {
                newObj[i] = lcpx.copy(obj[i]);
            }
        } else
            if (obj instanceof Function) {
                newObj = obj;
            }
            else
                if (obj instanceof Object) {
                    newObj = {};
                    let key_ = Object.keys(obj);
                    for (let i = 0; i < key_.length; i++) {
                        newObj[key_[i]] = lcpx.copy(obj[key_[i]]);
                    }
                } else {
                    newObj = obj;
                }
        return newObj;
    }
}
