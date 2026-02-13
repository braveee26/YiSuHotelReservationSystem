let api = [];
const apiDocListSize = 1
api.push({
    name: 'default',
    order: '1',
    list: []
})
api[0].list.push({
    alias: 'UserController',
    order: '1',
    link: '存储所有角色用户信息（商户、管理员）_前端控制器',
    desc: '存储所有角色用户信息（商户、管理员） 前端控制器',
    list: []
})
api[0].list[0].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://localhost:8080/user/getUser',
    methodId: '4c7eb1d24f1461861d7b7b222f04ab77',
    desc: '根据 ID 获取用户信息',
});
api[0].list[0].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://localhost:8080/user/currentInfo',
    methodId: 'a09a6b6d485e2270d75006fd185d170e',
    desc: '获取当前登录用户信息',
});
api[0].list[0].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://localhost:8080/user/register',
    methodId: '75a1d9ffbf34c2b8aff029bf644f60c1',
    desc: '用户注册',
});
api[0].list[0].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://localhost:8080/user/login',
    methodId: '202ea40f2611f390fe22d6bee1d22d8d',
    desc: '用户登录',
});
api[0].list[0].list.push({
    order: '5',
    deprecated: 'false',
    url: 'http://localhost:8080/user/admin/all',
    methodId: 'dc82528d06fb47cc9bfa7af160f4dd31',
    desc: '【管理员接口】获取所有用户列表 支持按角色过滤用户',
});
api[0].list[0].list.push({
    order: '6',
    deprecated: 'false',
    url: 'http://localhost:8080/user/admin/{id}/status',
    methodId: 'ff97185f9fef6701c4845d36db066bb2',
    desc: '【管理员接口】更新用户状态（启用/禁用）',
});
api[0].list[0].list.push({
    order: '7',
    deprecated: 'false',
    url: 'http://localhost:8080/user/admin/statistics',
    methodId: 'f3a98a6d954e1a22db28089344d28588',
    desc: '【管理员接口】获取平台用户统计数据 包括总用户数、各角色用户数等',
});
api[0].list.push({
    alias: 'HotelController',
    order: '2',
    link: '酒店核心信息管理_前端控制器',
    desc: '酒店核心信息管理 前端控制器',
    list: []
})
api[0].list[1].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/{id}',
    methodId: 'f3ed2dc898c83e9e22ca77616d0bc6e6',
    desc: '根据 ID 获取酒店详情',
});
api[0].list[1].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel',
    methodId: '4927ae0efd5f5bc374495445c7b36a24',
    desc: '新建酒店',
});
api[0].list[1].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/{id}',
    methodId: '54970e3797bf059c69bfeedd849576f4',
    desc: '编辑酒店信息',
});
api[0].list[1].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/merchant/{merchantId}',
    methodId: '5f4801aba9cf2bfe93634db0e704c24a',
    desc: '根据商户 ID 获取其所有酒店列表',
});
api[0].list[1].list.push({
    order: '5',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/{id}/online-status',
    methodId: 'ceefa35caa2d927537dff81d1561db28',
    desc: '切换酒店上/下线状态',
});
api[0].list[1].list.push({
    order: '6',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/{id}/submit-audit',
    methodId: '7acdde7b941960bf58413ce21234afde',
    desc: '商户提交酒店审核',
});
api[0].list[1].list.push({
    order: '7',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/merchant/{merchantId}/stats',
    methodId: '6f598a6060de0bb5beb5623730e9c349',
    desc: '获取商户酒店统计数据',
});
api[0].list[1].list.push({
    order: '8',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/admin/hotel-list',
    methodId: 'bd0cc3158b288328bc5cd0d62be0e28c',
    desc: '管理员获取所有酒店列表（支持筛选）',
});
api[0].list[1].list.push({
    order: '9',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/admin/{id}/audit',
    methodId: '0c74d7df957b192e3a65b2db4d962f7c',
    desc: '管理员审核酒店',
});
api[0].list[1].list.push({
    order: '10',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel/admin/hotel-stats',
    methodId: 'f4599d963e0955b6e60ad973fb6692a2',
    desc: '管理员分状态获取所有酒店统计数据',
});
api[0].list.push({
    alias: 'HotelImageController',
    order: '3',
    link: '酒店图片管理_前端控制器',
    desc: '酒店图片管理 前端控制器',
    list: []
})
api[0].list[2].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-image/list/{hotelId}',
    methodId: '14d0d5a0581b07c4f1bd970452d11813',
    desc: '获取指定酒店的全部图片',
});
api[0].list[2].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-image/upload/{hotelId}',
    methodId: 'f9000144143676a15da733c2d8e20e07',
    desc: '上传酒店图片',
});
api[0].list[2].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-image/batch',
    methodId: '95b00d66a8a9a690587c2633d1927e0b',
    desc: '批量保存酒店图片',
});
api[0].list[2].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-image/{imageId}',
    methodId: 'cb40b260abaa7aa85fe2d19613c690cf',
    desc: '删除酒店图片',
});
api[0].list[2].list.push({
    order: '5',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-image/batch/sort',
    methodId: 'b0501a196b543041ec577da612df5bcc',
    desc: '批量更新图片排序',
});
api[0].list.push({
    alias: 'RoomTypeController',
    order: '4',
    link: '酒店房型管理_前端控制器',
    desc: '酒店房型管理 前端控制器',
    list: []
})
api[0].list[3].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://localhost:8080/room-type/list/{hotelId}',
    methodId: 'e59477a2eafe8d31c21b484d8343c878',
    desc: '获取指定酒店的全部房型',
});
api[0].list[3].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://localhost:8080/room-type',
    methodId: '1d5e0112322f1774e1c79a0295a543dd',
    desc: '新建房型',
});
api[0].list[3].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://localhost:8080/room-type/{id}',
    methodId: '23b9a9042075f3558c8cccf2e893f78f',
    desc: '编辑房型',
});
api[0].list[3].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://localhost:8080/room-type/{id}',
    methodId: 'e70cbb3593f1924122cc3ec11f4f0276',
    desc: '删除房型',
});
api[0].list.push({
    alias: 'RoomImageController',
    order: '5',
    link: '存储房型详情图前端控制器',
    desc: '存储房型详情图前端控制器',
    list: []
})
api[0].list[4].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://localhost:8080/room-image/list/{roomId}',
    methodId: 'dccbb777c562ecf6ec7bfb57568d5c65',
    desc: '获取指定房型的全部图片',
});
api[0].list[4].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://localhost:8080/room-image/upload/{roomId}',
    methodId: '7e29934f6950428c7b78399b8cf33f7b',
    desc: '上传房型图片',
});
api[0].list[4].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://localhost:8080/room-image/batch',
    methodId: 'cafac174f0c0699133ec65e2147dfa6d',
    desc: '批量保存房型图片',
});
api[0].list[4].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://localhost:8080/room-image/{imageId}',
    methodId: '79fd8c348cd53ecf96df632414410e3c',
    desc: '删除房型图片',
});
api[0].list[4].list.push({
    order: '5',
    deprecated: 'false',
    url: 'http://localhost:8080/room-image/batch/sort',
    methodId: 'da24cee082c81cf2a3d335507fe7719d',
    desc: '批量更新图片排序',
});
api[0].list.push({
    alias: 'HotelAttributeController',
    order: '6',
    link: '酒店属性（设施）管理_前端控制器',
    desc: '酒店属性（设施）管理 前端控制器',
    list: []
})
api[0].list[5].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-attribute/list',
    methodId: 'a80d4922204ee79a17df739ba3be83d2',
    desc: '获取全部设施/属性列表',
});
api[0].list[5].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-attribute',
    methodId: 'd417e29189a98f08d93d433c624ded9b',
    desc: '新建设施/属性',
});
api[0].list[5].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-attribute/{id}',
    methodId: '530e6a68a5c9d4d8549d03d87210ff66',
    desc: '编辑设施/属性',
});
api[0].list[5].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://localhost:8080/hotel-attribute/{id}',
    methodId: '38d6aac85cb0e2a6f17a6ca6bd863903',
    desc: '根据 ID 删除指定的设施/属性。',
});
document.onkeydown = keyDownSearch;
function keyDownSearch(e) {
    const theEvent = e;
    const code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code === 13) {
        const search = document.getElementById('search');
        const searchValue = search.value.toLocaleLowerCase();

        let searchGroup = [];
        for (let i = 0; i < api.length; i++) {

            let apiGroup = api[i];

            let searchArr = [];
            for (let i = 0; i < apiGroup.list.length; i++) {
                let apiData = apiGroup.list[i];
                const desc = apiData.desc;
                if (desc.toLocaleLowerCase().indexOf(searchValue) > -1) {
                    searchArr.push({
                        order: apiData.order,
                        desc: apiData.desc,
                        link: apiData.link,
                        alias: apiData.alias,
                        list: apiData.list
                    });
                } else {
                    let methodList = apiData.list || [];
                    let methodListTemp = [];
                    for (let j = 0; j < methodList.length; j++) {
                        const methodData = methodList[j];
                        const methodDesc = methodData.desc;
                        if (methodDesc.toLocaleLowerCase().indexOf(searchValue) > -1) {
                            methodListTemp.push(methodData);
                            break;
                        }
                    }
                    if (methodListTemp.length > 0) {
                        const data = {
                            order: apiData.order,
                            desc: apiData.desc,
                            link: apiData.link,
                            alias: apiData.alias,
                            list: methodListTemp
                        };
                        searchArr.push(data);
                    }
                }
            }
            if (apiGroup.name.toLocaleLowerCase().indexOf(searchValue) > -1) {
                searchGroup.push({
                    name: apiGroup.name,
                    order: apiGroup.order,
                    list: searchArr
                });
                continue;
            }
            if (searchArr.length === 0) {
                continue;
            }
            searchGroup.push({
                name: apiGroup.name,
                order: apiGroup.order,
                list: searchArr
            });
        }
        let html;
        if (searchValue === '') {
            const liClass = "";
            const display = "display: none";
            html = buildAccordion(api,liClass,display);
            document.getElementById('accordion').innerHTML = html;
        } else {
            const liClass = "open";
            const display = "display: block";
            html = buildAccordion(searchGroup,liClass,display);
            document.getElementById('accordion').innerHTML = html;
        }
        const Accordion = function (el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;
            const links = this.el.find('.dd');
            links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
        };
        Accordion.prototype.dropdown = function (e) {
            const $el = e.data.el;
            let $this = $(this), $next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass('open');
            if (!e.data.multiple) {
                $el.find('.submenu').not($next).slideUp("20").parent().removeClass('open');
            }
        };
        new Accordion($('#accordion'), false);
    }
}

function buildAccordion(apiGroups, liClass, display) {
    let html = "";
    if (apiGroups.length > 0) {
        if (apiDocListSize === 1) {
            let apiData = apiGroups[0].list;
            let order = apiGroups[0].order;
            for (let j = 0; j < apiData.length; j++) {
                html += '<li class="'+liClass+'">';
                html += '<a class="dd" href="#' + apiData[j].alias + '">' + apiData[j].order + '.&nbsp;' + apiData[j].desc + '</a>';
                html += '<ul class="sectlevel2" style="'+display+'">';
                let doc = apiData[j].list;
                for (let m = 0; m < doc.length; m++) {
                    let spanString;
                    if (doc[m].deprecated === 'true') {
                        spanString='<span class="line-through">';
                    } else {
                        spanString='<span>';
                    }
                    html += '<li><a href="#' + doc[m].methodId + '">' + apiData[j].order + '.' + doc[m].order + '.&nbsp;' + spanString + doc[m].desc + '<span></a> </li>';
                }
                html += '</ul>';
                html += '</li>';
            }
        } else {
            for (let i = 0; i < apiGroups.length; i++) {
                let apiGroup = apiGroups[i];
                html += '<li class="'+liClass+'">';
                html += '<a class="dd" href="#_'+apiGroup.order+'_' + apiGroup.name + '">' + apiGroup.order + '.&nbsp;' + apiGroup.name + '</a>';
                html += '<ul class="sectlevel1">';

                let apiData = apiGroup.list;
                for (let j = 0; j < apiData.length; j++) {
                    html += '<li class="'+liClass+'">';
                    html += '<a class="dd" href="#' + apiData[j].alias + '">' +apiGroup.order+'.'+ apiData[j].order + '.&nbsp;' + apiData[j].desc + '</a>';
                    html += '<ul class="sectlevel2" style="'+display+'">';
                    let doc = apiData[j].list;
                    for (let m = 0; m < doc.length; m++) {
                       let spanString;
                       if (doc[m].deprecated === 'true') {
                           spanString='<span class="line-through">';
                       } else {
                           spanString='<span>';
                       }
                       html += '<li><a href="#' + doc[m].methodId + '">'+apiGroup.order+'.' + apiData[j].order + '.' + doc[m].order + '.&nbsp;' + spanString + doc[m].desc + '<span></a> </li>';
                   }
                    html += '</ul>';
                    html += '</li>';
                }

                html += '</ul>';
                html += '</li>';
            }
        }
    }
    return html;
}