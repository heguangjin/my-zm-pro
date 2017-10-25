/**
 * Created by heguangjin on 2017/9/2.
 */
zmEditor.component.banner = {
    setting: function () {
        var iSelected = zmEditor.component.nowEdit(), dataType;
        dataType = iSelected.find(".zm-component-banner").attr("data-type-banner");
    },
    //横条从容器中拖出来到放开展示到页面上这一过程所触发的事件
    getReady: function (main, obj) {
        var iSelected = zmEditor.component.nowEdit();
        iSelected.css("display", "flex");
        var box1 = iSelected.closest(".zm-component-box1");
        var w = main.width();
        h = main.height();
        //高宽比例
        var Proportion = h / w;
        zmEditor.component.banner.Proportion = Proportion;
        zmEditor.component.banner.fullscreen = "true";
        if (main.find(".zm-component-banner").length == 1) {
            switch (main.find(".zm-component-banner").attr("data-type-banner")) {
                case "color":
                    main.closest(".zm-component-box1").attr("data-fullscreen", "true");
                    main.css({"width": obj["width"], "height": parseInt(obj["width"]) * Proportion});
                    main.find(".zm-component-banner").css({"width": "100%", "height": "100%"});
                    main.find(".zm-bg-banner-BGC").css({"width": "100%", "height": "100%"});
                    break;
                case "image":
                    main.closest(".zm-component-box1").attr("data-fullscreen", "true");
                    main.css({"width": obj["width"], "height": parseInt(obj["width"]) * Proportion});
                    main.find(".zm-component-banner").css({"width": "100%", "height": "100%"});
                    main.find(".zm-bg-banner-PIC").css({
                        "width": "100%",
                        "height": "100%",
                        "background-position": "center"
                    });
                    break;
                case "video":
                    main.closest(".zm-component-box1").attr("data-fullscreen", "true");
                    main.css({"width": obj["width"], "height": parseInt(obj["width"]) * Proportion});
                    main.find(".zm-component-banner").css({"width": "100%", "height": "100%"});
                    main.find(".zm-bg-banner-Video").css({"width": "100%", "height": "100%"});
                    break;
                default:
                    break;
            };

            //记录并更新横条总宽度
            // zmEditor.component.banner.old_totalWidth = main.width();
            zmEditor.component.banner.old_totalWidth = parseFloat(main.css("width"));
        } else {

            iSelected.children("div").eq(3).nextAll("div").remove();
            //当横条为组合横条的时候（即横条里有多列的情况下）
            var combination = main.closest(".zm-component-box1").find(".zm-component-main-combination");
            combination.each(function (index, ele) {
                $(ele).children(".zm-component-banner-combination").addClass("zm-component-banner")
            });
            var count = combination.children(".zm-component-banner").length;
            var avgWidth = 1 / count * 100 + "%";
            main.closest(".zm-component-box1").attr("data-fullscreen", "true");
            main.css({"width": obj["width"], "height": parseInt(obj["width"]) * Proportion, "position": "relative"});
            combination.children(".zm-component-banner").css({"width": avgWidth, "height": "100%"});
            combination.children(".zm-component-banner").find("div").css({"width": "100%", "height": "100%"});
            combination.children(".zm-component-banner").find("video").css({"width": "100%", "height": "100%"});

            var main_banner_vein = combination.children(".zm-main-banner-vein");
            var banner_combination = combination.children(".zm-component-banner-combination");


            /*横条刚拖进页面的时候，先让main_banner_vein的display属性为none的原因是：横条第一次拖进页面的时候此时默认选中的是整个横条，此时
             **当点击横条的时候选中的就是某一列
             **/
            main_banner_vein.css({"background-color": "rgba(0,0,0,.0)", "display": "none"});
            // zm_component_vein_box2.css({"background-color":"rgba(0,0,0,.0)","display":"none"});
            combination.addClass("nowIsSelect");
            combination.removeClass("reborder");
            $(".zm-component-resize").css("display", "none");
            //初次点击（选中的是整个横条）和二次点击事件（选中的是横条中的某一列）函数
            zmEditor.component.banner.one0RSconedClick(main_banner_vein, banner_combination, combination);

            //记录并更新横条总宽度
            zmEditor.component.banner.old_totalWidth = parseFloat(main.css("width"));
        }

        zmEditor.component.banner.isVideo(main);
    },
    //判断当前被编辑的列或横条是否是视频，是就在左下角添加添加视频小图标
    isVideo:function(main){
        main.children(".zm-component-banner").each(function(index,ele){
            if($(ele).attr("data-type-banner") == "video"){
                // $(ele).append('<span class="span-video"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M921.008 705.903l-0.227-387.806c-0.008-11.069-11.549-17.979-20.773-12.439L730.11 396.831c-4.291 2.577-9.66-0.64-9.66-5.788v-85.479c0-24.995-19.691-45.446-43.762-45.446H146.753c-24.068 0-43.761 20.451-43.761 45.446v412.871c0 24.996 19.692 45.447 43.761 45.447h529.935c24.068 0 43.76-20.451 43.76-45.447v-85.34c0-5.145 5.363-8.361 9.654-5.791l170.145 91.064c9.233 5.528 20.767-1.396 20.761-12.465z"></path></svg></span>');
                $(ele).append('<span class="span-video iconfont icon-video2"></span>');
                $(ele).children(".span-video").css({
                    "display": "inline-block",
                    "width": "30px",
                    "height": "30px",
                    "position": "absolute",
                    "left": "3px",
                    "bottom": "-8px",
                    // "fill": "white",//svg
                    "color": "#fff",
                    "font-size": "21px",
                });
                $(ele).children("span.span-video").eq(0).show().siblings("span.video-span").remove();
            }else{
                $(ele).children("span.span-video").remove();
            }
        })
    },
    //初次点击（选中的是整个横条）和二次点击事件（选中的是横条中的某一列）函数
    one0RSconedClick: function (main_banner_vein, banner_combination, combination) {
        var iSelected = zmEditor.component.nowEdit();
        //初次点击选中得是父元素
        main_banner_vein.on("click", function () {
            //外围八个点及时复位
            zmEditor.component.banner.dotRecovery();
            iSelected.closest(".zm-component-box1").find(".zm-component-main-temp").css({
                "width": "100%",
                "height": "100%"
            });
            $(this).css({"display": "none", "z-index": -1, "background-color": "rgba(0,0,0,0)"});
            combination.removeClass("reborder");
            combination.addClass("nowIsSelect");
            combination.children(".zm-component-banner-combination").each(function (index, ele) {
                $(ele).addClass("zm-component-banner");
            });
        });
        //再次点击选中的是子元素（给横条的每一列注册点击事件）
        banner_combination.on("click", function () {
            zmEditor.component.banner.isMove = false;
            var iSelected = zmEditor.component.nowEdit();
            //这个判断的作用在于当从横条样式弹框中选择横条样式时，如果不是组合横条那么就不执行后续事件，如添加列标签，列宽，左右拖动器等=start
            if (!iSelected.hasClass("zm-component-main-combination")) {
                return;
            }
            //这个判断的作用在于当从横条样式弹框中选择横条样式时，如果不是组合横条那么就不执行后续事件，如添加列标签，列宽，左右拖动器等===end

            var index = $(this).index();
            //选中某一列横条外围的八个点消失
            $(this).closest(".zm-component-main-combination").siblings(".zm-component-main-temp").children(".zm-component-resize").removeClass("dotshow").addClass("dothid");
            combination.removeClass("nowIsSelect");//添加选中边框类
            combination.addClass("reborder");//选中边框类
            $(this).addClass("nowIsSelect").siblings(".zm-component-banner-combination").removeClass("nowIsSelect");
            //只有当前被单击的列添加类zm-component-banner，其兄弟元素移除该类
            $(this).addClass("zm-component-banner").siblings("div").removeClass("zm-component-banner");

            //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
            zmEditor.component.showOption(zmEditor.component.nowBox1());
            // //给删除按钮添加对应列的索引
            // $(".bannerDel").attr("data-zm-delindex", index);
            // //给右侧添加列按钮添加对应列的索引
            // $(".zm-bannerRightAdd").attr("data-zm-bannerRightAddIndex", index);
            // //给右移按钮添加对应列的索引
            // $(".zm-bannerRightMove").attr("data-zm-bannerRightMove", index);
            // //给左移按钮添加对应列的索引
            // $(".zm-bannerLeftMove").attr("data-zm-bannerLeftMove", index);

            //添加列标签=========================================================================================start
            $(this).append('<div class="banner-Column-label"></div>');
            if ($(this).index() == 0) {
                $(".banner-Column-label").css({"left": parseInt($(this).css("width")) / 4 + "px"});
            }
            $(this).children(".banner-Column-label").eq(0).siblings(".banner-Column-label").remove();
            $(this).siblings(".zm-component-banner-combination").children(".banner-Column-label").remove();
            $(this).children(".banner-Column-label").html("第" + ($(this).index() + 1) + "列" + '&nbsp;&nbsp;&nbsp;' + "宽 : " + $(this).css("width"));
            //banner_combinations这个要重新获取，否者长度将会保持原来的，并不会因为删除了某一列而改变
            var banner_combinations = combination.children(".zm-component-banner-combination");
            //当横条中只有一列时不显示列标签
            if (banner_combinations.length == 1) {
                //移除列标签
                $(".banner-Column-label").remove();
            }
            //添加列标签===============================================================================================end

            //添加列宽===============================================================================================start
            //添加左列宽盒子
            $(this).append('<div class="banner-Column-resizeL"></div>');
            //添加右列宽盒子
            $(this).append('<div class="banner-Column-resizeR"></div>');
            // $(this).children(".banner-Column-resizeL").text($(this).css("width"));
            $(this).children(".banner-Column-label").eq(0).nextAll(".banner-Column-label").remove();
            $(this).children(".banner-Column-resizeL").eq(0).nextAll(".banner-Column-resizeL").remove();
            $(this).children(".banner-Column-resizeR").eq(0).nextAll(".banner-Column-resizeR").remove();
            $(this).siblings(".zm-component-banner-combination").find(".banner-Column-resizeL").remove();
            $(this).siblings(".zm-component-banner-combination").find(".banner-Column-resizeR").remove();
            //添加列宽=================================================================================================end

            //判断当多列横条中只有一列的时候左移和右移按钮不显示=============================================================start
            var nowIsSelected = combination.children(".zm-component-banner-combination");
            if (nowIsSelected.length == 1) {
                //移除左移按钮
                $(".zm-component-edit").find(".zm-bannerLeftMove").remove();
                //移除右移按钮
                $(".zm-component-edit").find(".zm-bannerRightMove").remove();
            }
            //判断当多列横条中只有一列的时候左移和右移按钮不显示==============================================================end

            //添加左右横向拖动条=======================================================================================start
            //左拖动器
            $(this).append('<div class="zm-banner-resizeL"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 20 180.1 212.7" preserveAspectRatio="none"><g><polyline points="56.4,89.8 90.4,56.5 123.7,89.8"></polyline><polyline points="123.7,172.8 89.7,206.1 56.4,172.8"></polyline><path d="M31.1,113.4 149,113.4"></path><path d="M31.1,148.2 149,148.2"></path></g></svg></div>');
            // 右拖动器
            $(this).append('<div class="zm-banner-resizeR"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 20 180.1 212.7" preserveAspectRatio="none"><g><polyline points="56.4,89.8 90.4,56.5 123.7,89.8"></polyline><polyline points="123.7,172.8 89.7,206.1 56.4,172.8"></polyline><path d="M31.1,113.4 149,113.4"></path><path d="M31.1,148.2 149,148.2"></path></g></svg></div>');
            //添加左右横向拖动条=========================================================================================end
            $(this).children(".zm-banner-resizeR").eq(0).nextAll(".zm-banner-resizeR").remove();
            $(this).children(".zm-banner-resizeL").eq(0).nextAll(".zm-banner-resizeL").remove();
            //拖拽当前列=============================================================================================start
            $(this).siblings(".zm-component-banner-combination").children(".zm-banner-resizeR").remove();
            $(this).siblings(".zm-component-banner-combination").children(".zm-banner-resizeL").remove();

            var resizeR = document.querySelector('.zm-banner-resizeR');
            var resizeL = document.querySelector('.zm-banner-resizeL');
            var oBox = document.querySelector('.zm-component-banner');
            var left = "left";
            var right = "right";
            //拖动的是左拖动器
            zmEditor.component.banner.dragbanner(resizeL, oBox, $(this), index, left);
            //拖动的是右拖动器
            zmEditor.component.banner.dragbanner(resizeR, oBox, $(this), index, right);

            //满屏的时候不显示外侧拖动器
            var iSelected = zmEditor.component.nowEdit();
            var fullScreenWidth = parseInt(iSelected.closest(".zm-body").css("width"));
            var banner_combination = iSelected.children(".zm-component-banner-combination");
            if (parseInt(iSelected.css("width")) >= fullScreenWidth) {
                banner_combination.eq(0).children(".zm-banner-resizeL").remove();
                banner_combination.eq(banner_combination.length - 1).children(".zm-banner-resizeR").remove();
            }
            //拖拽当前列===============================================================================================end
        });
    },
    /*横条中的列左右拖动函数
     **flag(DOM对象)：被点击元素;
     **oBox(DOM对象);宽度被改变元素;
     **nowColumn(jquery对象);宽度被改变元素;
     **nowColumnIndex:当前被点击的列的索引;
     **direction:表示左拖动器还是右拖动器;
     */
    dragbanner: function (flag, oBox, nowColumn, nowColumnIndex, direction) {
        var b = direction;//变量b表示左右拖动器；
        var iSelected = zmEditor.component.nowEdit();
        var box1 = iSelected.closest('.zm-component-box1');
        var box1Dom = document.querySelector(".zm-component-box1");
        var mainbox1DOM = document.querySelector(".zm-component-main-combination");
        var box1Width = box1Dom.offsetWidth;
        flag.onmousedown = function (ev) {
            var box1Left = box1.css("left");
            //当鼠标对拖动器按下的时候记录此时的top值
            var box1Top = box1[0].offsetTop || box1[0].scrollTop;

            nowColumn.children(".banner-Column-label").eq(0).nextAll(".banner-Column-label").remove();
            nowColumn.children(".banner-Column-resizeL").eq(0).nextAll(".banner-Column-resizeL").remove();
            nowColumn.children(".banner-Column-resizeR").eq(0).nextAll(".banner-Column-resizeR").remove();
            nowColumn.children(".zm-banner-resizeR").eq(0).nextAll(".zm-banner-resizeR").remove();
            nowColumn.children(".zm-banner-resizeL").eq(0).nextAll(".zm-banner-resizeL").remove();

            var iEvent = ev || event;
            var dx = iEvent.clientX;//当你第一次单击的时候，存储x轴的坐标。
            var dw = oBox.offsetWidth;//存储默认的div的宽度。
            var nextoBox = nowColumn.parent(".zm-component-main-combination").children(".zm-component-banner-combination").eq(nowColumnIndex + 1);
            var preoBox = nowColumn.parent(".zm-component-main-combination").children(".zm-component-banner-combination").eq(nowColumnIndex - 1);
            var nextWidth = parseInt(nextoBox.css("width"));
            var preWidth = parseInt(preoBox.css("width"));

            //为了在拖拽改变宽度的时候不让横条左右移动
            box1.attr("data-fullscreen", "true");
            var old_totalWidth = zmEditor.component.banner.old_totalWidth;
            var length = iSelected.children(".zm-component-banner-combination").length;
            //每一列可允许的最小宽度为整个横条宽度的百分之五
            var minWidth = parseInt(old_totalWidth * 0.05);

            //记录除最后一列的其他列的宽(当拖动最后一列的右拖动器的时候)=====================================================start
            var widthArr = [];
            //记录除了当前被拖动列的其他列的宽度
            iSelected.children(".zm-component-banner-combination").each(function (index, ele) {
                if (index == (iSelected.children(".zm-component-banner-combination").length - 1)) {
                    return;
                }
                widthArr[index] = parseInt($(ele).css("width"));

            });
            //记录除最后一列的其他列的宽(当拖动最后一列的右拖动器的时）========================================================end

            //记录除第一列外的其他列的宽（当拖动第一列的左拖动器的时候）======================================================start
            var widthArrNotFirst = [];
            //每次当鼠标刚按下的时候要重新初始化realWidth的值
            zmEditor.component.banner.realWidth = 0;
            //记录除了当前被拖动列的其他列的宽度
            iSelected.children(".zm-component-banner-combination").each(function (index, ele) {
                if (index != 0) {
                    widthArrNotFirst[index - 1] = parseInt($(ele).css("width"));
                    //记录出第一列之外的所有列的宽度
                    zmEditor.component.banner.realWidth += widthArrNotFirst[index - 1];
                }
            });
            //记录除第一列外的其他列的宽（当拖动第一列的左拖动器的时候）========================================================end

            document.onmousemove = function (ev) {
                //在拖动拖动器的时候让横条保持原来的top值达到横条上下不移动的效果
                zmEditor.component.banner.box1_top = box1Top;
                //为了在拖拽改变宽度的时候不让横条左右移动
                box1.attr("data-fullscreen", "true");
                zmEditor.component.banner.isMove = true;
                $(".banner-Column-resizeL").css("display", "block");
                $(".banner-Column-resizeR").css("display", "block");
                var iEvent = ev || event;
                //点击的是右拖动器
                if (b == 'right') {
                    //判断拖动的是不是最后一列，单独做处理
                    if (nowColumnIndex == (length - 1)) {
                        oBox.style.width = dw + (iEvent.clientX - dx) + 'px';
                        // iSelected.css("width", old_totalWidth + (iEvent.clientX - dx) + "px");
                        //在移动拖动器的过程中除了最后一列的宽度发生改变，其他列的宽度不变
                        iSelected.children(".zm-component-banner-combination").each(function (index, ele) {
                            $(ele).css({"width": widthArr[index] + "px"});
                        });
                        if (oBox.offsetWidth <= minWidth) {//当盒子缩小到一定范围内的时候(现在设置最小宽度为横条宽度的0.05倍(即5%))，让他保持一个固定值，不再继续改变
                            oBox.style.width = minWidth + "px";
                            document.onmousemove = null;
                        }
                        zmEditor.component.banner.old_totalWidth = parseInt(iSelected.css("width", old_totalWidth + (iEvent.clientX - dx) + "px"));
                    } else {
                        oBox.style.width = dw + (iEvent.clientX - dx) + 'px';
                        nextoBox.css("width", nextWidth - (iEvent.clientX - dx) + 'px');
                    }
                    //外围八个点及时复位
                    zmEditor.component.banner.dotRecovery();
                    //此时的iEvent.clientX的为你拖动时一直改变的鼠标的X坐标，例如你拖动的距离为下图的绿色部分，第二个黑点就表示你此时的iEvent.clientX
                    //所以，此时的盒子宽度就等于绿色部分的距离加上原本盒子的距离
                    if (oBox.offsetWidth <= minWidth) {//当盒子缩小到一定范围内的时候(现在设置最小宽度为横条宽度的0.05倍(即5%))，让他保持一个固定值，不再继续改变
                        oBox.style.width = minWidth + "px";
                        nextoBox.css("width", (dw - minWidth + nextWidth) + 'px');
                    }
                    if (oBox.offsetWidth > (nextWidth - minWidth + dw)) {
                        oBox.style.width = (nextWidth - minWidth + dw) + "px";
                        nextoBox.css("width", minWidth + "px");
                    }
                    nowColumn.children(".banner-Column-label").html("第" + (nowColumnIndex + 1) + "列 " + '&nbsp;&nbsp;&nbsp;' + "宽 : " + nowColumn.css("width"));
                    //右拖动器对应列宽显示
                    $(".banner-Column-resizeR").text(nowColumn.css("width"));
                    //隐藏左拖动器列宽
                    $(".banner-Column-resizeL").css("display", "none");

                    //在移动的过程中不断的记录并更新box1的left的值
                    zmEditor.component.banner.box1Left = parseInt(box1.css("left"));
                }
                // 点击的是左拖动器
                if (b == 'left') {
                    //判断是第一列，单独做处理
                    if (nowColumnIndex == 0) {
                        box1.css({"left": box1Left + (iEvent.clientX - dx) + 'px'});
                        box1Dom.style.left = (iEvent.clientX - dx) + 'px';//disright表示盒子右边框距离左边的距离，disright-当前的盒子宽度，就是当前盒子距离左边的距离
                        box1.find(".zm-component-main-temp").css({"left": (iEvent.clientX - dx) + 'px'});
                        mainbox1DOM.style.left = (iEvent.clientX - dx) + 'px';
                        mainbox1DOM.style.width = box1Width - (iEvent.clientX - dx) + 'px';
                        oBox.style.width = dw - (iEvent.clientX - dx) + 'px';

                        //在移动的过程中不断的记录并更新box1的left的值
                        zmEditor.component.banner.box1Left = parseInt(box1.css("left"));
                        //在移动的过程中不断的记录并更新移动的距离（包含正负）
                        zmEditor.component.banner.totalMove = iEvent.clientX - dx;
                        //在移动拖动器的过程中除了第一列的宽度发生改变，其他列的宽度不变
                        iSelected.children(".zm-component-banner-combination").each(function (index, ele) {
                            if (index != 0) {
                                $(ele).css({"width": widthArrNotFirst[index - 1] + "px"});
                            }
                        });
                        if (oBox.offsetWidth <= minWidth) {
                            oBox.style.width = minWidth + 'px';
                            document.onmousemove = null;
                        }
                        //total为所有列的实际宽度之和
                        var total = zmEditor.component.banner.realWidth + (dw - (iEvent.clientX - dx));
                        //横条的宽度与实际的宽度进行比较如果大于实际宽度，那么给横条的width重新赋值为实际宽度
                        if (parseInt(iSelected.css("width")) > total) {
                            iSelected.css("width", total);
                        }
                    } else {
                        oBox.style.width = dw - (iEvent.clientX - dx) + 'px';//iEvent.clientX-dx表示第二次鼠标的X坐标减去第一次鼠标的X坐标，得到绿色移动的距离（为负数），再加上原本的div宽度，就得到新的宽度。 图3
                        preoBox.css("width", preWidth + (iEvent.clientX - dx) + 'px');
                        if (oBox.offsetWidth <= minWidth) {
                            oBox.style.width = minWidth + 'px';
                            preoBox.css("width", (dw - minWidth + preWidth) + 'px');
                        }
                        if (oBox.offsetWidth > (preWidth - minWidth + dw)) {
                            oBox.style.width = (preWidth - minWidth + dw) + "px";
                            preoBox.css("width", minWidth + "px");
                        }
                    }
                    nowColumn.children(".banner-Column-label").html("第" + (nowColumnIndex + 1) + "列 " + '&nbsp;&nbsp;&nbsp;' + "宽 : " + nowColumn.css("width"));
                    //左拖动器对应的列宽显示
                    $(".banner-Column-resizeL").text(nowColumn.css("width"));
                    //隐藏右拖动器列宽
                    $(".banner-Column-resizeR").css("display", "none");
                }
                //外围八个点及时复位
                zmEditor.component.banner.dotRecovery();
            };
            document.onmouseup = function () {
                document.onmousedown = null;
                document.onmousemove = null;
                //这里的判断的作用是:当用户只是点击了左右拖动器，但是并没有发生移动，此时用变量isMove来判断，但发生移动的时候isMove的布尔值为true
                //则继续执行程序，当isMove布尔值为false，那就说明没有触动onmousemove事件，则终止程序的的下一步执行(类似开关的作用)
                if (zmEditor.component.banner.isMove == false) {
                    return;
                }
                ;
                //保持原来的data-fullscreen属性，因为在拖动的过程中data-fullscreen的属性值一定是true（为了在拖动单个列的时候不让整个横条左右移动）
                box1.attr("data-fullscreen", zmEditor.component.banner.fullscreen);

                $(".banner-Column-resizeL").css("display", "none");
                $(".banner-Column-resizeR").css("display", "none");

                //移动第一列的的左拖动器为了让box1的left的值做出相应的变化==================================================start
                if (nowColumnIndex == 0 && direction == "left") {
                    var box1Left2 = zmEditor.component.banner.box1Left;
                    box1.find(".zm-component-main-temp").css("left", "0px");
                    if (parseInt(box1.css("left")) != 0) {
                        box1.css("left", parseInt(box1Left) + zmEditor.component.banner.totalMove + "px");
                    } else {
                        box1.css("left", box1Left2 + "px");
                    }
                    iSelected.css("left", "0px");
                }
                //移动第一列的的左拖动器为了让box1的left的值做出相应的变化====================================================end

                zmEditor.component.banner.old_totalWidth = parseInt(iSelected.css("width"));
                var old_totalWidth = zmEditor.component.banner.old_totalWidth;
                //把宽度转化成百分比的形式(只要移动其中的某一列，所有列的百分比要重新计算)======================================start
                var banner_combination = box1.find(".zm-component-main-combination").children(".zm-component-banner-combination");
                var sumOfPercentage = 0;//用来计算所有列宽度的百分比之和
                var CycleTimes = 0;//记录遍历的次数
                banner_combination.each(function (index, ele) {
                    CycleTimes++;
                    var eachWidth = parseInt($(ele).css("width"));
                    var Percentage = Math.round(eachWidth / old_totalWidth * 100);
                    sumOfPercentage += Percentage;
                    //这里用Math.round() 四舍五入取整，最终所有列的百分比之和刚好为百分之百，一般情况下和都是百分之百,(否者就是比百分之百大百分之一或百分之二)
                    $(ele).css({"width": Percentage + "%"});
                    if (CycleTimes == banner_combination.length && sumOfPercentage < 100) {//如果遍历到最后一列，并且所有列的百分比之和小于一百
                        if (index == (banner_combination.length - 1)) {//最后一列的宽度所占的百分比加1，确保所有列的宽度的百分比之和至少是百分之百
                            $(ele).css({"width": (Math.round(eachWidth / old_totalWidth * 100) + 1) + "%"});
                        }
                    }
                });
                //把宽度转化成百分比的形式(只要移动其中的某一列，所有列的百分比要重新计算)========================================end
                // zmEditor.component.banner.old_totalWidth = parseInt(iSelected.css("width"));
                zmEditor.component.banner.dotRecovery();
            };
            // 事件处理过程中，阻止了事件冒泡，也阻止了默认行为（比如没有执行超链接的跳转）
            return false;
        };
    },
    //点击满屏与取消满屏切换
    bannerFullPage: function () {
        var Proportion = zmEditor.component.banner.Proportion;
        var iSelected = zmEditor.component.nowEdit();
        var box1 = iSelected.closest('.zm-component-box1');
        var nofullScreenWidth = box1.parent("div").find(".zm-component-pageCont").css("width");
        var fullScreenWidth = iSelected.closest(".zm-body").css("width");
        //取消满屏svg  path
        var html1 = '<path d="M45,202.4c0,23.2,20.3,43.4,43.4,43.4l221.6,1.4l-88.3,88.3c-13,13-13,33.3-1.4,44.9l15.9,15.9c13,13,33.3,15.9,44.9,4.3  l172.3-172.3c5.8-5.8,10.1-13,10.1-21.7c0-8.7-2.9-17.4-10.1-24.6L281,9.8c-13-13-33.3-13-46.3,0l-15.9,15.9  c-13,15.9-10.1,36.2,2.9,49.2l85.4,85.4l-218.7-1.4C63.8,160.4,45,179.2,45,202.4L45,202.4z"/>'
            + '<path d="M1031.3,207.2c0-23.2-20.3-43.4-43.4-43.4l-220.1-2.9L854.7,74c13-13,14.5-34.8,2.9-46.3l-15.9-15.9  c-13-13-34.8-14.5-46.3-2.9L623,181.2c-5.8,5.8-10.1,13-10.1,21.7c-1.4,7.2,1.5,15.9,8.7,23.2l172.3,172.3c13,13,33.3,13,46.3,0  l15.9-15.9c14.5-14.5,8.7-34.8-4.3-47.8l-85.4-85.4l221.6,1.4C1012.5,249.2,1031.3,230.4,1031.3,207.2L1031.3,207.2z"/>'
            + '<path d="M418.9,206.7"/>';
        //满屏svg  path
        var html2 = '<path d="M657.8,202.4c0,23.2,20.3,43.4,43.4,43.4l221.6,1.4l-88.3,88.3c-13,13-13,33.3-1.4,44.9l15.9,15.9   c13,13,33.3,15.9,44.9,4.3l172.3-172.3c5.8-5.8,10.1-13,10.1-21.7c0-8.7-2.9-17.4-10.1-24.6L893.9,9.8c-13-13-33.3-13-46.3,0   l-15.9,15.9c-13,15.9-10.1,36.2,2.9,49.2l85.4,85.4l-218.7-1.4C676.6,160.4,657.8,179.2,657.8,202.4L657.8,202.4z M418.9,206.7   c0-23.2-20.3-43.4-43.4-43.4l-220.1-2.9l86.9-86.9c13-13,14.5-34.8,2.9-46.3l-15.9-15.9c-13-13-34.8-14.5-46.3-2.9L10.5,180.7   c-5.8,5.8-10.1,13-10.1,21.7c-1.4,7.2,1.5,15.9,8.7,23.2l172.3,172.3c13,13,33.3,13,46.3,0l15.9-15.9c14.5-14.5,8.7-34.8-4.3-47.8   l-85.4-85.4l221.6,1.4C400.1,248.7,418.9,229.9,418.9,206.7L418.9,206.7z M418.9,206.7"></path>';

        if (box1.closest(".zm-main").find(".zm-bannerFullPageBtn").find("svg").html() == html2) {
            box1.closest(".zm-main").find(".zm-bannerFullPageBtn").attr("data-zm-title", "取消满屏").find("svg").html(html1);
            box1.css("left", "-351.5px");
            box1.find(".zm-component-main").css({
                "width": fullScreenWidth,
                "height": parseInt(fullScreenWidth) * Proportion + "px"
            });
            box1.attr("data-fullscreen", "true");

            zmEditor.component.banner.fullscreen = "true";


        } else {
            box1.closest(".zm-main").find(".zm-bannerFullPageBtn").attr("data-zm-title", "满屏").find("svg").html(html2);
            box1.css("left", "0px");
            box1.find(".zm-component-main").css({
                "width": nofullScreenWidth,
                "height": parseInt(nofullScreenWidth) * Proportion + "px"
            });
            box1.attr("data-fullscreen", "false");

            zmEditor.component.banner.fullscreen = "false";

        }
        // 当被编辑框的宽高突然改变的时候（并不是通过拖动改变的宽高），让外围的八个小圆点及时跟着变化
        zmEditor.component.banner.dotRecovery();

        //记录并更新横条总宽度
        zmEditor.component.banner.old_totalWidth = parseFloat(iSelected.css("width"));

        //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
        zmEditor.component.showOption(zmEditor.component.nowBox1());
    },
    //当被编辑框的宽高突然改变的时候（并不是通过拖动改变的宽高，比如点击满屏或取消满屏按钮的时候），让外围的八个小圆点及时跟着变化
    dotRecovery: function () {
        var iSelected = zmEditor.component.nowEdit();
        var box1 = iSelected.closest('.zm-component-box1');
        var dotWidth = parseInt(box1.find(".zm-component-resize").children("span").eq(0).width());
        var changWidth = parseInt(box1.css("width")) - dotWidth / 4;
        var changHeight = parseInt(box1.css("height")) - dotWidth / 4;

        /*当通过点击取消满屏和满屏图标进行横条宽高的改变是，盒子外面的八个小圆点并不能跟着盒子大小的变化及时的变化，而dotRecovery(ele)这个方法就能解决盒子外面的八个
         *小圆点能够随着盒子大小的变化而及时变化（这是在点击满屏与取消满屏时所产生的问题）,问题根本在于类名为.zm-component-main-temp的div只有在高或宽在发生变化是，这八个
         *小圆点才会根据盒子的大小发生变化，而在点击图标进行满屏和取消满屏切换时，类名为.zm-component-main-temp的div高或宽并不会自动发生改变，那只能再次获取当前盒子的高宽
         *然后赋值给类名为.zm-component-main-temp的div让其高宽发生变化
         */
        box1.find(".zm-component-main-temp").css({"width": changWidth + "px", "height": changHeight + "px"});
    },
    //点击设置按钮事件
    bannerSet: function () {
        //这个str的作用是当点击设置按钮时弹出框显示的是设置项部分
        var str = "set";
        // zmEditor.component.banner.bannerEditor(str);
        this.bannerEditor(str);
    },
    //点击编辑按钮事件
    bannerEditor: function (str) {
        var iSelected = zmEditor.component.nowEdit();
        $('.zm-dialog-box').remove();
        zmEditor.dialog.loading('module/components/banner/zm-components-bannerPageFull.html', function () {
            $(".zm-dialog-box").find(".zm-dialog-bg").remove();
            $(".zm-dialog-box").find(".zm-dialog-title").html("横条背景");
            var pop = $(".zm-edit-component-banner");
            var ele = iSelected;
            zmEditor.component.banner.bannerSetOfDetails(pop, ele, str);

            var zm_dialog_bg = pop.find(".zm-edit-component-bg-preview");
            var oldUl = pop.find(".zm-edit-component-bgbanner-oldUse-list");
            //点击编辑或设置编辑按钮或双击横条（或双击横条中的某一列）让横条背景弹框中头部的背景色与当前被编辑框的背景色一致===========start
            pop.find(".zm-edit-component-bgbanner-oldUse-list").find("li").removeClass("zm-select-on");
            // zmEditor.component.banner.addOldBg(oldUl);
            if(iSelected.children("div").length == 1){
                var bgSize = zm_dialog_bg.css("background-size");
                var singleBanner = iSelected.children(".zm-component-banner").children("div.zm-bg-banner-PIC").eq(0);
                var realColor = singleBanner.css("background-color");
                if(singleBanner.attr("data-pre-type") == "overlay" && realColor == "rgba(0, 0, 0, 0)"){
                    zm_dialog_bg.css({"background-size": "contain", "background-color": ""});
                }else{
                    if(bgSize != "contain"){
                        zm_dialog_bg.css({"background-size":bgSize,"background-color":realColor});
                    }
                    // oldUl.children("li").eq(0).css("background-color",realColor);
                }
            }else{
                iSelected.children("div.zm-component-banner-combination").each(function(index,ele){

                    var bgSize = zm_dialog_bg.css("background-size");
                    console.log(bgSize);
                    var realColor = $(ele).children("div.zm-bg-banner-PIC").css("background-color");
                    console.log(realColor);
                    if($(ele).children("div.zm-bg-banner-PIC").eq(0).attr("data-pre-type") == "overlay"){
                        if($(ele).children("div.zm-bg-banner-PIC").eq(0).css("background-color") == "rgba(0, 0, 0, 0)"){
                            zm_dialog_bg.css({"background-size": "contain", "background-color": ""});
                        }else{
                            zm_dialog_bg.css({"background-size": "contain", "background-color": realColor});
                            // oldUl.children("li").eq(1).css("background-color",realColor);
                        }
                    }else{
                        if(bgSize != "contain"){
                            zm_dialog_bg.css({"background-size":bgSize});
                        }
                    }
                });
            }
            //点击编辑或设置编辑按钮或双击横条（或双击横条中的某一列）让横条背景弹框中头部的背景色与当前被编辑框的背景色一致=============end
        });
    },
    //点击了编辑按钮之后具体要执行的事件
    bannerSetOfDetails: function (pop, ele, str) {
        var iSelected = zmEditor.component.nowEdit();
        //当每次点击编辑按钮时，当前编辑对象的背景是什么，那么弹出框的头部就显示与之对应的背景图/色================================start
        var pop_videoBtn = pop.find(".zm-edit-component-bg-preview-videoBtn");//视频播放控制按钮
        var zm_dialog_bg = pop.find(".zm-edit-component-bg-preview");
        var banner_type = iSelected.find(".zm-component-banner").attr("data-type-banner");
        var oldUl = pop.find(".zm-edit-component-bgbanner-oldUse-list");
        zmEditor.component.banner.addOldBg(oldUl);
        oldUl.children("li").eq(0).addClass("zm-select-on").siblings("li").removeClass("zm-select-on");
        zmEditor.component.banner.oldBgIsVideo(oldUl);

        if (banner_type == "color") {
            var nowEditor_bg = iSelected.children(".zm-component-banner").children("div").css("background-color");
            zm_dialog_bg.css({"background-color": nowEditor_bg});
            pop_videoBtn.hide();
        } else if (banner_type == "image") {
            var nowEditor_image = iSelected.children(".zm-component-banner").children("div").css("background-image");
            var nowEditor_color = iSelected.children(".zm-component-banner").children("div").css("background-color");
            zm_dialog_bg.css({"background-image": nowEditor_image, "background-color": nowEditor_color});
            // zm_dialog_bg.css({"background-image": nowEditor_image, "background-color": ""});
            pop_videoBtn.hide();
        } else if (banner_type == "video") {
            var nowEditor_video_image = iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").attr("data-image-url");
            var nowEditor_video_image_url = iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").css("background-image")

            //这个视频的路径查找可能有问题（在当前的项目文件结构不改变的情况下路劲没问题）
            if (nowEditor_video_image_url == "none") {
                zm_dialog_bg.css({"background-image": 'url("./' + nowEditor_video_image + '")'});
            } else {
                zm_dialog_bg.css({"background-image": nowEditor_video_image_url});
            }
            var zm_dialog_bg_img = zm_dialog_bg.css("background-image");
            var zm_dialog_bg_color = zm_dialog_bg.css("background-color");
            var videoIndex = $(this).index();
            oldUl.children("li").eq(videoIndex).css({"background-color": zm_dialog_bg_color});
            pop_videoBtn.show();
        }
        //当每次点击编辑按钮时，当前编辑对象的背景是什么，那么弹出框的头部就显示与之对应的背景图/色==================================end

        //颜色,图片,视频选择按钮点击事件================================================================================start
        var pop_color = pop.find(".choiceBtn-color"),//颜色选择按钮
            pop_image = pop.find(".choiceBtn-image"),//图片选择按钮
            pop_video = pop.find(".choiceBtn-video");//视频选择按钮
        //颜色选择插件装载
        pop_color.append(zmEditor.component.setItems.strings.color(iSelected.children(".zm-component-banner").children("div").eq(0),
            {style: "mini", param: "backgroundColor", componentType:'banner',callback: color_callback}));//这里的传的color_callback是为了让页面被编辑框的背景色，弹出框头部背景色，使用过下面第一个li的背景色统一变化

        // pop_color.on("click",function(){
        //     iSelected.children(".zm-component-banner").children("div").eq(0).css("backgroundImage","none");
        // });
        //图片弹窗加载
        pop_image.on("click", function () {
            choiceFileModules.choiceModules({multiple: false, modules: 'picture', callBack: image_return})
        });

        //视频弹窗加载
        pop_video.on("click", function () {
            choiceFileModules.choiceModules({multiple: false, modules: 'video', callBack: video_return})
        });

        //color_callback函数是为了让页面被编辑框的背景色，弹出框头部背景色，使用过的背景下面对应的li的背景色统一变化
        function color_callback() {
            var changColor = iSelected.children(".zm-component-banner").children("div").eq(0).css("background-color");
            var arr = changColor.split(",");
            if(arr.length == 3){
                var strColor2 = arr.join();
            }
            if(!arr[3]){
                arr[2] = arr[2].split(")")[0];
                arr.push('0)');
            }
            zmEditor.component.banner.mainnowColor = arr.join();
            if(arr[0].trim() != 'rgba(0' && arr[1].trim() != '0' && arr[2].trim() != '0' && arr[3].trim() == '0)'){
                arr[(arr.length - 1)] = "1)";
            }

            var strColor = arr.join();
            iSelected.children(".zm-component-banner").children("div").eq(0).css("background-color", strColor);
            var changeColorEnd = iSelected.children(".zm-component-banner").children("div").eq(0).css("backgroundColor");
            //保存修改后的背景底色
            var zmtabsbordercolor = iSelected.children(".zm-component-banner").children("div").eq(0).attr("zm-tabs-bordercolor");

            oldUl.children("li.zm-select-on").css({"background-color": changeColorEnd});
            // zm_dialog_bg.css({"background-color": strColor});
            zm_dialog_bg.css({"background-color": strColor2 ? strColor2 : strColor});
            //获取到要修改的元素的索引
            var index = oldUl.children("li.zm-select-on").index();

            //获取本地存储的json数据
            var old_Use_BgArr = JSON.parse(localStorage.getItem("old_Use_Bg")) ? JSON.parse(localStorage.getItem("old_Use_Bg")) : [];
            // var old_Use_BgArr = JSON.parse(localStorage.getItem("old_Use_Bg")) ? JSON.parse(localStorage.getItem("old_Use_Bg")) : [{}];

            //把要修改的属性重新赋值给json数据中对应的属性
            if(old_Use_BgArr[index]){
                old_Use_BgArr[index].background_color = zmtabsbordercolor;
            }
            //更新本地数据
            localStorage.setItem("old_Use_Bg", JSON.stringify(old_Use_BgArr));
        }

        //保存覆盖颜色和覆盖纹理设置
        function color_vien() {
            //获取到要修改的元素的索引
            var index = oldUl.children("li.zm-select-on").index();
            //获取本地存储的json数据
            var old_Use_BgArr = JSON.parse(localStorage.getItem("old_Use_Bg"));
            //保存修改后的覆盖颜色
            var colorvien = iSelected.children(".zm-component-banner").children(".zm-bg-banner-vein").attr("zm-tabs-bordercolor");
            //保存修改后的覆盖纹理图片路径
            var vien_image = iSelected.children(".zm-component-banner").children(".zm-bg-banner-vein").css("background-image");
            //保存修改后的覆盖纹理ID
            var data_vein = iSelected.children(".zm-component-banner").children(".zm-bg-banner-vein").attr("data-vein");
            console.log(index);
            if(index >= 0){
                old_Use_BgArr[index].colorvien = colorvien;
                old_Use_BgArr[index].vienImage = vien_image;
                old_Use_BgArr[index].dataVein = data_vein;
            }

            //更新本地数据
            localStorage.setItem("old_Use_Bg", JSON.stringify(old_Use_BgArr));
        }

        //点击图片按钮并选择添加视频时的回调函数
        function image_return(data) {
            console.log(data);
            console.log(data[0].fPath?data[0].fPath:data[0].fUrl);
            var imageUrl = data[0].fPath?data[0].fPath:data[0].fUrl;
            //在图片列表中弹框中选中任意一个图片然后再点击选择添加按钮，此时横条背景变化=========================================start
            zm_dialog_bg.css({"background-image": 'url(' + imageUrl+ ')'});
            zm_dialog_bg.css({"background-size":"cover"});
            iSelected.children(".zm-component-banner").attr("data-type-banner", "image");
            iSelected.children(".zm-component-banner").attr("data-type-image", "");
            iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-PIC");
            iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").eq(0).siblings(".zm-bg-banner-PIC").remove();
            iSelected.children(".zm-component-banner").children("div").find("video").remove();
            iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").css({
                "background-position": "center",
                "background-image": 'url(' + imageUrl + ')',
                "backgroundSize": "cover",
                "background-color": ""
            }).attr("data-image-url", "");
            iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").attr("data-pre-type","");
            pop_videoBtn.hide();
            iSelected.children(".zm-component-banner").append('<div class="zm-bg-banner-vein" style="z-index:1;width: 100%; height: 100%;left:0px;top:0px;position:absolute;"><!--遮罩层--></div>');
            //在图片列表中弹框中选中任意一个图片然后再点击选择添加按钮，此时横条背景变化===========================================end

            //选择添加后把添加的图片保存到本地存储，然后再更新横条背景弹框中“使用过的背景”的内容==================================start
            //同步本地localStorage存储的“使用过的背景”
            var old_Use_BgArr = JSON.parse(localStorage.getItem("old_Use_Bg"));

            old_Use_BgArr = old_Use_BgArr ? old_Use_BgArr : [];
            var obj = {};
            // obj["class"] = "zm-select-on";
            obj["data_prev_type"] = "image";
            obj["data_prev_bg"] = "none";
            obj["data_prev_name"] = "none";
            obj["data_prev_time"] = "none";
            obj["background_image"] = 'url(' + imageUrl + ')';
            obj["background_color"] = "none";
            obj["background_size"] = "cover";

            old_Use_BgArr.unshift(obj);
            if (old_Use_BgArr.length > 2) {
                old_Use_BgArr = old_Use_BgArr.splice(0, 2);
            }
            //每次点击横条样式中的内容都要把本地localStorage存储的“使用过的背景”进行更新
            localStorage.setItem("old_Use_Bg", JSON.stringify(old_Use_BgArr));
            //每次点击族蚂页面背景资源下的任意一张图片时，同时更新使用过的背景
            zmEditor.component.banner.addOldBg(oldUl);
            //再次判断使用过的背景的图片的数量不能大于两张
            if (oldUl.children("li").length > 2) {
                oldUl.children("li").eq(1).nextAll("li").remove();
            }
            //选择添加后把添加的图片保存到本地存储，然后再更新横条背景弹框中“使用过的背景”的内容====================================end

            //下面这行代码的作用是当点击“族蚂页面背景资源下的任何一张背景图时，上方“使用过的的背景”的所有图片的绿色选中小圆点去掉
            oldUl.children("li").eq(0).addClass("zm-select-on").siblings("li").removeClass("zm-select-on");
            //加载相应的设置项
            loadSetting("image");

            zmEditor.component.banner.isVideo(iSelected);
            zmEditor.component.banner.oldBgIsVideo(oldUl);
        }

        //点击视频按钮选择视频，并选择添加时的回调函数
        function video_return(data) {
            console.log(data);
            console.log(data[0].fScaleUrl?data[0].fScaleUrl:data[0].fImgUrl);
            var videoUrl = data[0].fScaleUrl?data[0].fScaleUrl:data[0].fImgUrl;
            //在视频列表中弹框中选中任意一个视频然后再点击选择添加按钮，此时横条背景变化=========================================start
            zm_dialog_bg.css({"background-image": 'url(' + videoUrl+ ')'});
            zm_dialog_bg.css("background-size", "cover");
            iSelected.children(".zm-component-banner").attr("data-type-banner", "video");
            iSelected.children(".zm-component-banner").attr("data-type-image", "");
            iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-Video");
            iSelected.children(".zm-component-banner").children("div").append('<video style="object-fit: cover;width:100%;height:100%;" loop="true"></video>');
            iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").css({
                "overflow": "hidden",
                "background-color": "",
                "background-image": 'url(' + videoUrl + ')',
                "background-size": "cover"
            }).eq(0).siblings(".zm-bg-banner-Video").remove();
            iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").attr("data-image-url", "");
            iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").attr("data-video-url", data[0].fScaleUrl);
            iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").children("video").eq(0).siblings("video").remove();
            iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").children("video").attr("src", data[0].fUrl);
            pop_videoBtn.show();
            pop_videoBtn.children().eq(0).show().siblings().hide();
            iSelected.children(".zm-component-banner").append('<div class="zm-bg-banner-vein" style="z-index:1;width: 100%; height: 100%;left:0px;top:0px;position:absolute;"><!--遮罩层--></div>');
            //在视频列表中弹框中选中任意一个视频然后再点击选择添加按钮，此时横条背景变化===========================================end

            //选择添加后把添加的视频保存到本地存储，然后再更新横条背景弹框中“使用过的背景”的内容==================================start
            //同步本地localStorage存储的“使用过的背景”
            var old_Use_BgArr = JSON.parse(localStorage.getItem("old_Use_Bg"));

            old_Use_BgArr = old_Use_BgArr ? old_Use_BgArr : [];
            var obj = {};
            // obj["class"] = "zm-select-on";
            obj["data_prev_type"] = "video";
            obj["data_prev_bg"] = data[0].fUrl;
            obj["data_prev_name"] = "none";
            obj["data_prev_time"] = "none";
            obj["background_image"] = 'url(' + videoUrl + ')';
            obj["background_color"] = "none";
            obj["background_size"] = "cover";

            old_Use_BgArr.unshift(obj);
            if (old_Use_BgArr.length > 2) {
                old_Use_BgArr = old_Use_BgArr.splice(0, 2);
            }
            //每次点击横条样式中的内容都要把本地localStorage存储的“使用过的背景”进行更新
            localStorage.setItem("old_Use_Bg", JSON.stringify(old_Use_BgArr));
            //每次点击族蚂页面背景资源下的任意一张图片时，同时更新使用过的背景
            zmEditor.component.banner.addOldBg(oldUl);
            //再次判断使用过的背景的图片的数量不能大于两张
            if (oldUl.children("li").length > 2) {
                oldUl.children("li").eq(1).nextAll("li").remove();
            }
            //选择添加后把添加的视频保存到本地存储，然后再更新横条背景弹框中“使用过的背景”的内容==================================start
            //下面这行代码的作用是当点击“族蚂页面背景资源下的任何一张背景图时，上方“使用过的的背景”的所有图片的绿色选中小圆点去掉

            oldUl.children("li").eq(0).addClass("zm-select-on").siblings("li").removeClass("zm-select-on");
            //加载相应的设置项
            loadSetting("video");

            zmEditor.component.banner.isVideo(iSelected);
            iSelected.children(".zm-component-banner").children("span").eq(0).show().siblings("span").remove();
            //判断横条背景弹框中“使用过的背景”中的背景哪一个是视频就加上视频小图标
            zmEditor.component.banner.oldBgIsVideo(oldUl);
        }

        //颜色,图片,视频选择按钮点击事件==================================================================================end

        //族蚂页面背景资源下面显示的图片=================================================================================start
        var pop_weal_list = pop.find(".zm-edit-component-bgbanner-library-list");//资源库列表
        //加载资源库(从zmEditor.component.setItems.wealth拿到图片资源)
        pop_weal_list.append(zmEditor.component.setItems.resource("bg"));
        // pop_weal_list.append(zmEditor.component.setItems.resource());
        //===========================================================================================================end

        /*   事件 资源窗/设置按钮切换事件 资源库点击事件 视频播放按钮控制   */

        //资源库/设置项切换===========================================================================================start
        var switchBtn = pop.find(".zm-edit-component-bg-tab-list > li");
        var switchBox = pop.find(".zm-edit-component-bg-tab-content > div");
        var listWrap = pop.find(".zm-edit-component-bg-setting-list");
        var bg_layer_imgCol = iSelected.children(".zm-component-banner").children("div").eq(0);//固定背景图片层
        switchBox.mCustomScrollbar({theme: "minimal"});//加滚动条
        //资源库/设置项切换点击事件
        //资源库/设置项切换
        switchBtn.on("click", function () {
            var _this = $(this);
            var _index = switchBtn.index($(this));
            _this.addClass("zm-cur").siblings().removeClass("zm-cur");
            var type = iSelected.children(".zm-component-banner").attr("data-type-banner");

            //每次点击族蚂页面背景资源下的任意一张图片时，同时更新使用过的背景
            zmEditor.component.banner.addOldBg(oldUl);

            switch (_index) {
                case 0:
                    $(".zm-dialog-box").find(".zm-dialog-title").html("横条背景");
                    switchBox.eq(0).show().siblings().hide();
                    break;
                case 1:
                    $(".zm-dialog-box").find(".zm-dialog-title").html("横条设置");
                    switchBox.eq(1).show().siblings().hide();
                    loadSetting(type);

            }

            for (var i = 0; i < oldUl.children("li").length; i++) {
                if (oldUl.children("li").eq(i).attr("data-prev-type") == undefined) {
                    oldUl.children("li").eq(i).remove();
                }
            }
            //再次判断使用过的背景的图片的数量不能大于两张
            if (oldUl.children("li").length > 2) {
                oldUl.children("li").eq(1).nextAll("li").remove();
            }
            // var mainnowColor = iSelected.children(".zm-component-banner").children("div").eq(0).css("background-color");
            var mainnowColor = zmEditor.component.banner.mainnowColor;

            iSelected.children(".zm-component-banner").each(function(index,ele){
                if (mainnowColor == "rgba(0, 0, 0, 0)" && $(ele).children(".zm-bg-banner-PIC").attr("data-pre-type") == "overlay") {
                    zm_dialog_bg.css({"background-size": "contain", "background-color": "rgba(255,255,255,1)"});
                } else {
                    if($(ele).children(".zm-bg-banner-PIC").attr("data-pre-type") == "overlay"){
                        zm_dialog_bg.css({"background-size": "contain", "background-color": mainnowColor});
                    }else{
                        zm_dialog_bg.css({"background-size": "cover", "background-color": mainnowColor});
                    }

                }
            });

        });
        //===========================================================================================================end

        //当点击页面上的设置图标时(并不是点击弹出框“横条样式”中的设置按钮)，弹出框显示的是对应设置项内容============================start
        if (str == 'set') {
            switchBtn.eq(1).addClass("zm-cur").siblings().removeClass("zm-cur");
            switchBox.eq(1).show().siblings().hide();
            $(".zm-dialog-box").find(".zm-dialog-title").html("横条设置");
            var type = iSelected.children(".zm-component-banner").attr("data-type-banner");
            var url_bg_color = iSelected.children(".zm-component-banner").children("div").css("background-color");
            var url_bg_img = iSelected.children(".zm-component-banner").children("div").css("background-image");
            $(".zm-dialog-box").find(".zm-edit-component-bg-preview").css({"background-color": url_bg_color});
            $(".zm-dialog-box").find(".zm-edit-component-bg-preview").css({"background-color": url_bg_img});

            //加载相应的设置项
            loadSetting(type);
        }
        //当点击页面上的设置图标时(并不是点击弹出框“横条样式”中的设置按钮)，弹出框显示的是对应设置项内容==============================end

        //选择性加载设置项
        function loadSetting(type) {
            listWrap.empty();
            switch (type) {
                case "video":
                    listWrap.append(zmEditor.component.setItems.vein(iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein")));
                    listWrap.append(zmEditor.component.setItems.slider(iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein"), {
                        title: "覆盖颜色",
                        style: "color",
                        param: "backgroundColor",
                        componentType:'banner',
                        // bannervien: color_vien,
                        callback: color_vien
                    }));
                    // listWrap.append(zmEditor.component.setItems.slider(iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein"),{title: "覆盖颜色",style: "color",param: "backgroundColor",callback:color_vien}));
                    listWrap.append(zmEditor.component.setItems.playSpeed(iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").find("video")));
                    listWrap.append(zmEditor.component.setItems.playLoop(iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").find("video")));
                    break;
                case "image":
                case "overlay":
                    listWrap.append(zmEditor.component.setItems.vein(iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein")));
                    listWrap.append(zmEditor.component.setItems.slider(iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein"), {
                        title: "覆盖颜色",
                        style: "color",
                        param: "backgroundColor",
                        componentType:'banner',
                        // bannervien: color_vien
                        callback: color_vien
                    }));
                    // listWrap.append(zmEditor.component.setItems.slider(iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein"),{title: "覆盖颜色",style: "color",param: "backgroundColor",callback:color_vien}));
                    listWrap.append(zmEditor.component.setItems.slider(iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC"), {
                        title: "背景底色",
                        style: "color",
                        param: "backgroundColor",
                        componentType:'banner',
                        // callback: color_callback,
                        bannercallback: color_callback
                    }));
                    //这里的传的color_callback是为了让页面被编辑框的背景色，弹出框头部背景色，使用过下面第一个li的背景色统一变化
                    // listWrap.append(zmEditor.component.setItems.slider(zm_dialog_bg,{title: "背景底色",style: "color",param: "backgroundColor",callback:color_callback}));//这里的传的color_callback是为了让页面被编辑框的背景色，弹出框头部背景色，使用过下面第一个li的背景色统一变化
                    break;
                case "color":
                    listWrap.append(zmEditor.component.setItems.slider(bg_layer_imgCol, {
                        title: "背景颜色",
                        style: "color",
                        param: "backgroundColor",
                        componentType:'banner',
                        // callback: color_callback,
                        bannercallback: color_callback
                    }));
                    break;
            }
        }
        //使用过的背景点击事件=========================================================================================start

        //解决在横条样式中选择单色横条和视频横条作为使用过的背景时，在横条背景弹框中使用过的背景在显示单色横条变白的问题===============start
        var localMsg = JSON.parse(localStorage.getItem("old_Use_Bg"));
        if (localMsg) {
            for (var i = 0; i < localMsg.length; i++) {
                if (localMsg[i].data_prev_type == "color") {
                    var nowLocalColor = localMsg[i].background_color;
                    oldUl.children("li").eq(i).css({"background-color": nowLocalColor});
                }
            }
        }
        //解决在横条样式中选择单色横条和视频横条作为使用过的背景时，在横条背景弹框中使用过的背景在显示单色横条变白的问题=================end
        oldUl.on("click", "li", function () {
            iSelected.removeClass("nowIsSelect");
            //再次判断使用过的背景的图片的数量不能大于两张
            if (oldUl.children("li").length > 2) {
                oldUl.children("li").eq(1).nextAll("li").remove();
            }
            //下面这行代码的作用是当点击“使用过的背景“下的任何一张背景图时，下方“族蚂页面背景资源”的所有图片的绿色选中小圆点去掉
            // pop.find(".zm-edit-component-wealth-box").find("li").removeClass("zm-select-on");
            pop.find(".zm-edit-component-resource").find("li").removeClass("zm-select-on");
            var index = $(this).index();
            var _type = $(this).attr("data-prev-type");
            var data_prev_bg = $(this).attr("data-prev-bg");
            var data_prev_bg_url = $(this).css("background-image");
            $(this).addClass("nowSelect").siblings().removeClass("nowSelect");
            $(this).addClass("zm-select-on").siblings("li").removeClass("zm-select-on");//添加选中时显示绿色的小圆勾的类名zm-select-on
            var now_bg = $(this).css("background-image");
            zm_dialog_bg.css({"background-image": now_bg});
            //当在页面中被编辑框显示的是组合横条类型的时候，点击编辑按钮时在横条背景弹出框中选中任意一个图片，都会把整个横条的背景替换掉(此时横条的类型
            // 不再是组合横条而是单色或图片或视频)，而不是替换其中的某一列，除非选中的是列，然后再点击编辑按钮，此时替换的才是对应列的背景=start
            if (iSelected.children("div.zm-component-banner").length > 1) {
                iSelected.removeClass("zm-component-main-combination");
                iSelected.removeClass("zm-component-banner");
                iSelected.removeClass("reborder");
                iSelected.children("div").eq(0).css("width", "100%").removeClass("zm-component-banner-combination").siblings("div").remove();
            }
            //=======================================================================================================end

            switch (_type) {
                case "image":
                    var nowColor = $(this).css("background-color");
                    console.log(nowColor);
                    // $(this).attr("data-pre-type","");
                    zm_dialog_bg.css("background-size", "cover");
                    iSelected.children(".zm-component-banner").attr("data-type-banner", _type);
                    nowEditor_box.css({"background-image": now_bg, "backgroundSize": "cover"});
                    iSelected.children(".zm-component-banner").children("div").eq(0).removeClass().addClass("zm-bg-banner-PIC");
                    iSelected.children(".zm-component-banner").children("div").find("video").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").css({"background-position": "center","background-color":""});
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").attr("data-pre-type","");
                    pop_videoBtn.hide();
                    iSelected.children(".zm-component-banner").append('<div class="zm-bg-banner-vein" style="z-index:1;width: 100%; height: 100%;left:0px;top:0px;position:absolute;"><!--遮罩层--></div>')
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-vein").eq(0).siblings(".zm-bg-banner-vein").remove();
                    break;
                case "overlay":
                    // $(this).attr("data-pre-type","");
                    var nowColor = $(this).css("background-color");
                    console.log(nowColor);
                    if (nowColor == "rgba(0, 0, 0, 0)") {
                        zm_dialog_bg.css({"background-size": "contain", "background-color": ""});
                    } else {
                        zm_dialog_bg.css({"background-size": "contain", "background-color": nowColor});
                    }
                    iSelected.children(".zm-component-banner").attr("data-type-banner", "image");
                    nowEditor_box.css({
                        "background-image": now_bg,
                        "backgroundSize": " initial",
                        "background-repeat": "repeat"
                    });
                    iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-PIC");
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").eq(0).siblings(".zm-bg-banner-PIC").remove();
                    iSelected.children(".zm-component-banner").children("div").find("video").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").css({
                        "background-size": "initial",
                        "background-image": data_prev_bg_url,
                        "background-color": nowColor
                    }).attr("data-image-url", data_prev_bg);
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").attr("data-pre-type","overlay");
                    pop_videoBtn.hide();
                    iSelected.children(".zm-component-banner").append('<div class="zm-bg-banner-vein" style="z-index:1;width: 100%; height: 100%;left:0px;top:0px;position:absolute;"><!--遮罩层--></div>');
                    break;
                case "color":
                    // $(this).attr("data-pre-type","");
                    var nowColor = $(this).css("background-color");
                    zm_dialog_bg.css({"background-size": "contain", "background-color": nowColor});
                    iSelected.children(".zm-component-banner").attr("data-type-banner", _type);
                    nowEditor_box.css({"background-image": now_bg, "backgroundSize": "initial"});
                    iSelected.children(".zm-component-banner").children("div").css("background-color", nowColor);
                    iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-BGC");
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-BGC").eq(0).siblings(".zm-bg-banner-BGC").remove();
                    iSelected.children(".zm-component-banner").children("div").find("video").remove();
                    pop_videoBtn.hide();
                    break;
                case "video":
                    // $(this).attr("data-pre-type","video");
                    zm_dialog_bg.css("background-size", "cover");
                    iSelected.children(".zm-component-banner").attr("data-type-banner", _type);
                    nowEditor_box.css({"background-image": now_bg, "backgroundSize": "cover"});
                    iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-Video");
                    iSelected.children(".zm-component-banner").children("div").append('<video style="object-fit: cover;width:100%;height:100%;" loop="true"></video>');
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").css({"overflow": "hidden"}).eq(0).siblings(".zm-bg-banner-Video").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").children("video").eq(0).siblings("video").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").children("video").attr("src", data_prev_bg);
                    iSelected.children(".zm-component-banner").append('<div class="zm-bg-banner-vein" style="z-index:1;width: 100%; height: 100%;left:0px;top:0px;position:absolute;"><!--遮罩层--></div>');
                    pop_videoBtn.show();
                    pop_videoBtn.children().eq(0).show().siblings().hide();
                    // zmEditor.component.banner.isVideo(iSelected);
                    $(this).children("span").eq(0).show().nextAll("span").remove();
                    break;
                default:
                    console.log("还没有为该类型进行相关配置");
                    break;
            }
            //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
            zmEditor.component.showOption(zmEditor.component.nowBox1());


            zmEditor.component.banner.oldBgIsVideo(oldUl);
            var old_bg_list = JSON.parse(localStorage.getItem("old_Use_Bg"));
            for (var i = 0; i < oldUl.children("li").length; i++) {
                if (oldUl.children("li").eq(i).attr("data-prev-type") == undefined) {
                    oldUl.children("li").eq(i).remove();
                }
            }
            //再次判断使用过的背景的图片的数量不能大于两张
            if (oldUl.children("li").length > 2) {
                oldUl.children("li").eq(1).nextAll("li").remove();
            }
            //点击哪一个使用过的背景，就在页面中显示与之对应的背景包括之前已经设置并保存的设置项（即修改后的属性）
            iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein").css("background-color", old_bg_list[index].colorvien);//覆盖纹理的透明度
            iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein").css("background-image", old_bg_list[index].vienImage);//覆盖纹理图片
            iSelected.children(".zm-component-banner").find(".zm-bg-banner-vein").attr("data-vein", old_bg_list[index].dataVein);//覆盖纹理图片的索引
            zmEditor.component.banner.isVideo(iSelected);
            iSelected.children(".zm-component-banner").children("span.span-video").eq(0).show().nextAll("span.span-video").remove();
            //判断横条背景弹框中“使用过的背景”中的背景哪一个是视频就加上视频小图标
            zmEditor.component.banner.oldBgIsVideo(oldUl);
        });
        //加载使用过的背景==============================================================================================end

        //“族蚂页面背景资源”点击事件====================================================================================start
        var nowEditor_box = iSelected.find(".zm-component-banner").children("div").eq(0);
        var pop_weal_li_click = pop.find(".zm-edit-component-bgbanner-library-list").children(".zm-edit-component-resource");
        var old_Use_BgArr = [];
        pop_weal_li_click.find(".zm-edit-component-resource-title").text("族蚂页面背景资源");
        //“族蚂页面背景资源”点击事件
        pop_weal_li_click.on("click", "li", function () {
            iSelected.removeClass("nowIsSelect");
            //下面这行代码的作用是当点击“族蚂页面背景资源下的任何一张背景图时，上方“使用过的的背景”的所有图片的绿色选中小圆点去掉
            oldUl.children("li").eq(1).removeClass("zm-select-on");
            var newli = $(this).clone(true);
            //给“使用过的背景”的盒子里添加li,最近点击过的背景图永远放在“使用过的背景”下方li的第零项
            newli.insertBefore(oldUl.children("li").eq(0));

            //下面这行代码的作用是当点击“族蚂页面背景资源下的任何一张背景图时，上方“使用过的的背景”的所有图片的绿色选中小圆点去掉
            oldUl.children("li").eq(0).addClass("zm-select-on").siblings("li").removeClass("zm-select-on");

            // oldUl.children("li").find("span").remove();//去掉“使用过的背景”的所有视频图片的小摄像头图标

            if (oldUl.children("li").length == 2) {//但是用过的背景存储两张背景是给定高度
                oldUl.css("height", "170px");
            }
            if (oldUl.children("li").length > 2) {//“使用过的背景”里面至少存储一个背景，最多两个背景，多余两个背景则移除多余的
                oldUl.children("li").eq(1).nextAll("li").remove();
            }
            var _type = $(this).attr("data-prev-type");
            var data_prev_bg = $(this).attr("data-prev-bg");
            var data_prev_bg_url = $(this).css("background-image");
            $(this).addClass("zm-select-on").siblings().removeClass("zm-select-on");//添加选中时显示绿色的小圆勾的类名zm-select-on
            var now_bg = $(this).css("background-image");
            var now_bgcolor = $(this).css("background-color");
            zm_dialog_bg.css({"background-image": now_bg, "background-color": now_bgcolor});
            //每次点击都要把本地localStorage存储的“使用过的背景”进行更新
            zmEditor.component.banner.oldBg(old_Use_BgArr, $(this));
            //当在页面中被编辑框显示的是组合横条类型的时候，点击编辑按钮时在横条背景弹出框中选中任意一个图片，都会把整个横条的背景替换掉(此时横条的类型
            // 不再是组合横条而是单色或图片或视频)，而不是替换其中的某一列，除非选中的是列，然后再点击编辑按钮，此时替换的才是对应列的背景=start
            if (iSelected.children("div.zm-component-banner").length > 1) {
                iSelected.removeClass("zm-component-main-combination");
                iSelected.removeClass("zm-component-banner");
                iSelected.removeClass("reborder");
                iSelected.children("div").eq(0).css("width", "100%").removeClass("zm-component-banner-combination").siblings("div").remove();
            }
            //=======================================================================================================end
            switch (_type) {
                case "image":
                    zm_dialog_bg.css("background-size", "cover");
                    iSelected.children(".zm-component-banner").attr("data-type-banner", _type);
                    iSelected.children(".zm-component-banner").attr("data-type-image", "");
                    nowEditor_box.css({"background-image": now_bg, "backgroundSize": "cover"});
                    iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-PIC");
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").eq(0).siblings(".zm-bg-banner-PIC").remove();
                    iSelected.children(".zm-component-banner").children("div").find("video").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").css({
                        "background-position": "center",
                        "background-image": data_prev_bg_url,
                        "background-color":""
                    }).attr("data-image-url", data_prev_bg);
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").attr("data-pre-type","");
                    pop_videoBtn.hide();
                    iSelected.children(".zm-component-banner").append('<div class="zm-bg-banner-vein" style="z-index:1;width: 100%; height: 100%;left:0px;top:0px;position:absolute;"><!--遮罩层--></div>');
                    break;
                case "overlay":
                    var nowColor = $(this).css("background-color");
                    console.log(nowColor);
                    zm_dialog_bg.css({"background-size": "contain", "background-color": nowColor?nowColor:""});
                    iSelected.children(".zm-component-banner").attr({
                        "data-type-banner": "image",
                        "data-type-image": _type
                    });
                    nowEditor_box.css({
                        "background-image": now_bg,
                        "background-size": "initial",
                        "background-repeat": "repeat"
                    });
                    iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-PIC");
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").eq(0).siblings(".zm-bg-banner-PIC").remove();
                    iSelected.children(".zm-component-banner").children("div").find("video").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").css({
                        "background-size": "initial",
                        "background-image": data_prev_bg_url,
                        "background-color": nowColor
                    }).attr("data-image-url", data_prev_bg);
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-PIC").attr("data-pre-type","overlay");
                    pop_videoBtn.hide();
                    iSelected.children(".zm-component-banner").append('<div class="zm-bg-banner-vein" style="z-index:1;width: 100%; height: 100%;left:0px;top:0px;position:absolute;"><!--遮罩层--></div>');
                    break;
                case "color":
                    zm_dialog_bg.css("background-size", "contain");
                    iSelected.children(".zm-component-banner").attr("data-type-image", "");
                    iSelected.children(".zm-component-banner").attr("data-type-banner", "color");
                    nowEditor_box.css({"background-image": now_bg, "background-size": "initial"});
                    iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-BGC").css("background-repeat", "repeat");
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-BGC").eq(0).siblings(".zm-bg-banner-BGC").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-BGC").css({"background-image": data_prev_bg_url}).attr("data-image-url", data_prev_bg);
                    iSelected.children(".zm-component-banner").children("div").find("video").remove();
                    pop_videoBtn.hide();
                    break;
                case "video":
                    zm_dialog_bg.css("background-size", "cover");
                    iSelected.children(".zm-component-banner").attr("data-type-banner", _type);
                    nowEditor_box.css({"background-image": now_bg, "background-size": "cover"});
                    iSelected.children(".zm-component-banner").attr("data-type-image", "");
                    iSelected.children(".zm-component-banner").children("div").removeClass().addClass("zm-bg-banner-Video");
                    iSelected.children(".zm-component-banner").children("div").append('<video style="object-fit: cover;width:100%;height:100%;" loop="true"></video>');
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").css({"overflow": "hidden"}).eq(0).siblings(".zm-bg-banner-Video").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").css({"background-image": data_prev_bg_url}).attr("data-image-url", data_prev_bg);
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").children("video").eq(0).siblings("video").remove();
                    iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").children("video").attr("src", data_prev_bg);
                    pop_videoBtn.show();
                    pop_videoBtn.children().eq(0).show().siblings().hide();
                    iSelected.children(".zm-component-banner").append('<div class="zm-bg-banner-vein" style="z-index:1;width: 100%; height: 100%;left:0px;top:0px;position:absolute;"><!--遮罩层--></div>');
                    iSelected.children(".zm-component-banner").children("span").eq(0).show().siblings("span").remove();
                    break;
                default:
                    console.log("还没有为该类型进行相关配置");
                    break;
            }
            //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
            zmEditor.component.showOption(zmEditor.component.nowBox1());

            //每次点击族蚂页面背景资源下的任意一张图片时，同时更新使用过的背景
            zmEditor.component.banner.addOldBg(oldUl);

            //再次判断使用过的背景的图片的数量不能大于两张
            if (oldUl.children("li").length > 2) {
                oldUl.children("li").eq(1).nextAll("li").remove();
            }
            //判断是视频并添加视频小图标
            zmEditor.component.banner.isVideo(iSelected);
            iSelected.children(".zm-component-banner").children("span").eq(0).siblings("span").remove();
            //判断横条背景弹框中“使用过的背景”中的背景哪一个是视频就加上视频小图标
            zmEditor.component.banner.oldBgIsVideo(oldUl);
        });
        //播放按钮控制===============================================================================================start
        pop_videoBtn.on("click", function () {
            var bg_layer_banner_video = iSelected.children(".zm-component-banner").children(".zm-bg-banner-Video").children("video");
            // var zm_dialog_bg_video = pop.find(".zm-edit-component-bg-preview").children("video").eq(0);
            var _this = $(this);
            _this.children("span").css({"display": "block", "background-color": "@baseColor"});
            // if(bg_layer_banner_video[0].paused && zm_dialog_bg_video[0].paused){
            if (bg_layer_banner_video[0].paused) {
                bg_layer_banner_video[0].play();
                // zm_dialog_bg_video[0].play();
                _this.children().eq(1).show().siblings().hide();
                iSelected.children(".zm-component-banner").find("span.span-video").css("display","none");
            } else {
                bg_layer_banner_video[0].pause();
                // zm_dialog_bg_video[0].pause();
                _this.children().eq(0).show().siblings().hide();
                iSelected.children(".zm-component-banner").find("span.span-video").css("display","block");
            }
        });
        //===========================================================================================================end
    },
    //在本地存储使用过的背景
    oldBg: function (arr, ele2) {
        //先把本地存储的“使用过的背景”获取出来，再在这个值的基础上进行使用背景的更新（不先获取本地数据的话就会出现有时存储的是一条数据，有时是两条数据）
        arr = JSON.parse(localStorage.getItem("old_Use_Bg")) ? JSON.parse(localStorage.getItem("old_Use_Bg")) : [];
        var obj = {};
        // obj["class"] = ele2.attr("class");
        obj["data_prev_type"] = ele2.attr("data-prev-type");//保存类型例如：image，color，video,overlay
        obj["data_prev_bg"] = ele2.attr("data-prev-bg");//路径
        obj["data_prev_name"] = ele2.attr("data-prev-name");//图片名称
        obj["data_prev_time"] = ele2.attr("data-prev-time");//视频时长
        obj["background_image"] = ele2.css("background-image");//背景图具体url
        obj["background_color"] = ele2.css("background-color");//背景底色
        obj["background_size"] = ele2.css("background-size");//设置背景图片大小
        obj["colorvien"] = '0';//覆盖层颜色
        obj["vienImage"] = '';//覆盖纹理图片路径
        obj["dataVein"] = '';//覆盖纹理图片id
        arr.unshift(obj);//每次点击“族蚂页面资源”下的图片都把当前点击的图片放到“使用过的背景”的最前面
        if (arr.length > 2) {//因为本地最多保存两张使用过的背景，当多于两张时，就截取最前面的两张保存到本地
            arr = arr.splice(0, 2);
        }
        localStorage.setItem("old_Use_Bg", JSON.stringify(arr));//本地保存
    },
    //在“横条背景”弹框的“使用过的背景”的下方添加使用过的背景
    addOldBg: function (oldUl) {
        //获取本地存储的使用过的背景
        var old_bg_list = JSON.parse(localStorage.getItem("old_Use_Bg"));
        //判断本地是否存在“使用过的背景”的文件
        old_bg_list = old_bg_list ? old_bg_list : [];

        //当本地存在数据就动态创建li用来展示“使用过的背景”
        for (var i = 0; i < old_bg_list.length; i++) {
            oldUl.append('<li></li>');
            oldUl.children("li").eq(i).attr({
                "class": old_bg_list[i].class,
                "data-prev-bg": old_bg_list[i].data_prev_bg,
                "data-prev-name": old_bg_list[i].data_prev_name,
                "data-prev-time": old_bg_list[i].data_prev_time,
                "data-prev-type": old_bg_list[i].data_prev_type
            });
            oldUl.children("li").eq(i).css({
                "background-color": old_bg_list[i].background_color,
                "background-image": old_bg_list[i].background_image,
                "background-size": old_bg_list[i].background_size
            });
            // oldUl.children("li").removeClass("zm-select-on");
        }

    },
    //判断横条背景弹框中“使用过的背景”中的背景哪一个是视频就加上视频小图标
    oldBgIsVideo:function(oldUl){
        console.log(oldUl.children("li").length);
        console.log(oldUl.children("li"));
        oldUl.children("li").each(function (index, ele) {
            if ($(ele).attr("data-prev-type") == "video") {
                console.log("video");
                console.log(index);
                console.log($(ele).attr("data-prev-type"));
                // $(this).css("position", "relative").append('<span class="video-span"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M921.008 705.903l-0.227-387.806c-0.008-11.069-11.549-17.979-20.773-12.439L730.11 396.831c-4.291 2.577-9.66-0.64-9.66-5.788v-85.479c0-24.995-19.691-45.446-43.762-45.446H146.753c-24.068 0-43.761 20.451-43.761 45.446v412.871c0 24.996 19.692 45.447 43.761 45.447h529.935c24.068 0 43.76-20.451 43.76-45.447v-85.34c0-5.145 5.363-8.361 9.654-5.791l170.145 91.064c9.233 5.528 20.767-1.396 20.761-12.465z"></path></svg></span>');
                $(ele).append('<span class="span-video-old iconfont icon-video2"></span>');
                $(ele).children("span.span-video-old").css({
                    "display": "inline-block",
                    "width": "30px",
                    "height": "30px",
                    "position": "absolute",
                    "left": "3px",
                    "bottom": "-8px"
                });
                // $(ele).children("span.span-video-old").eq(0).show().siblings("span.span-video-old").remove();
                $(ele).children("span").eq(0).show().siblings("span").remove();
            }
            else {
                $(ele).children("span").remove();
            }
        });
    },
    //点击变更样式按钮事件
    changeStyle: function (_this, iSelected) {
        //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
        zmEditor.component.showOption(zmEditor.component.nowBox1());
        _this.addClass("zm-component-settingPanel-curLi");
        var select, bannerType, now_img;
        bannerType = _this.find(".zm-component-banner").attr("data-type-banner");
        now_img = iSelected.find(".zm-component-banner").children("div").css("background-image");
        iSelected.children("div").attr("data-type-banner", bannerType);
        //判断是否多列横条的情况
        if (_this.children("div").hasClass("zm-component-main-combination")) {
            iSelected.children("div").eq(3).nextAll("div").remove();
            iSelected.css("display", "flex");
            select = _this.children("div.zm-component-main-combination").children("div").clone(true);
            var newWidth = 1 / (select.length - 1) * 100 + "%";
            select.css({"width": newWidth, "height": "100%"});
            select.eq(select.length - 1).css({"height": "100%", "width": "100%"});
            select.find("div").css({"height": "100%", "width": "100%"});
            iSelected.children("div").replaceWith(select);
            select.find("video").eq(0).siblings("video").remove();
            iSelected.addClass("zm-component-main-combination");

            iSelected.children(".zm-component-banner-combination").each(function (index, ele) {
                $(ele).addClass("zm-component-banner");
            });
            //给从横条样式弹框点击了组合横条绑定初次点击和二次点击事件=======================================================start
            var combination = iSelected.closest(".zm-component-box1").find(".zm-component-main-combination");
            var main_banner_vein = combination.children(".zm-main-banner-vein");
            var banner_combination = combination.children(".zm-component-banner-combination");
            zmEditor.component.banner.one0RSconedClick(main_banner_vein, banner_combination, combination);
            zmEditor.component.banner.dotRecovery();
            //给从横条样式弹框点击了组合横条绑定初次点击和二次点击事件=========================================================end

            iSelected.children("div").eq(3).nextAll("div").remove();
            //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
            zmEditor.component.showOption(zmEditor.component.nowBox1());
        } else {

            iSelected.removeClass("zm-component-main-combination");
            iSelected.removeClass("nowIsSelect");
            iSelected.removeClass("zm-component-banner");

            iSelected.children("div").eq(0).removeClass("zm-component-banner-combination").siblings("div").remove();
            iSelected.children("div").eq(0).removeClass("nowIsSelect").css({"width": "100%"});

            iSelected.children("div").addClass("zm-component-banner");
            if (bannerType == "video") {
                select = _this.children("div").children("div").children("div").clone(true);
                select.css({"height": "100%", "width": "100%"});
                iSelected.children("div").children("div").replaceWith(select);
                iSelected.children("div").children("div").children("video").css({"height": "100%"})
            } else if (bannerType == "image") {
                select = _this.children("div").children("div").children("div").clone(true);
                select.css({"height": "100%", "width": "100%"});
                iSelected.children("div").children("div").replaceWith(select);
                iSelected.children("div").children("div").css("background-position", "center");
                iSelected.children("div").append('<div class="zm-bg-banner-vein"><!--遮罩层--></div>')
            } else if (bannerType == "color") {
                select = _this.children("div").children("div").children("div").clone(true);
                select.css({"height": "100%", "width": "100%"});
                iSelected.children("div").children("div").replaceWith(select);
                //下面这行代码的作用是：当选择单色横条时，改变背景色，而背景图片则去掉
                iSelected.children(".zm-component-banner").children("div").css({
                    "background-image": "none",
                    "data-type-banner": "color"
                });
            }
            //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
            zmEditor.component.showOption(zmEditor.component.nowBox1());
        }
        $(".zm-edit-component-certain").children("span").attr("onclick2", "none");
        //删除多余项
        if (iSelected.children("div").children("div").length > 1) {
            iSelected.children("div").children("div.zm-bg-banner-PIC").eq(0).siblings(".zm-bg-banner-PIC").remove();
            iSelected.children("div").children("div.zm-bg-banner-Video").eq(0).siblings(".zm-bg-banner-Video").remove();
            iSelected.children("div").children("div.zm-bg-banner-Video").children("video").eq(0).siblings().remove();
            iSelected.children("div").children("div.zm-bg-banner-BGC").eq(0).siblings("div.zm-bg-banner-BGC").remove();
            iSelected.children("div").children("div.zm-bg-banner-vein").eq(0).siblings("div.zm-bg-banner-vein").remove();
        }
        //同步本地localStorage存储的“使用过的背景”
        var old_Use_BgArr = JSON.parse(localStorage.getItem("old_Use_Bg"));

        old_Use_BgArr = old_Use_BgArr ? old_Use_BgArr : [];
        var obj = {};
        if (bannerType == "color") {
            var bgColor = _this.children("div").children("div").children("div").css("background-color");
            // obj["class"] = "zm-select-on";
            obj["data_prev_type"] = bannerType;
            obj["data_prev_bg"] = "none";
            obj["data_prev_name"] = "none";
            obj["data_prev_time"] = "none";
            obj["background_image"] = "none";
            obj["background_color"] = bgColor;
            obj["background_size"] = "cover";
        } else if (bannerType == "image") {
            var bgimage = _this.children("div").children("div").children("div").css("background-image");
            // obj["class"] = "zm-select-on";
            obj["data_prev_type"] = bannerType;
            obj["data_prev_bg"] = "none";
            obj["data_prev_name"] = "none";
            obj["data_prev_time"] = "none";
            obj["background_image"] = bgimage;
            obj["background_color"] = "none";
            obj["background_size"] = "cover";
        } else if (bannerType == "video") {
            var data_video_url = _this.children("div").children("div").children("div").attr("data-video-url"); //data-prev-bg
            var data_image_url = 'url(' + _this.children("div").children("div").children("div").attr("data-image-url") + ')';
            // obj["class"] = "zm-select-on";
            obj["data_prev_type"] = bannerType;
            obj["data_prev_bg"] = data_video_url;
            obj["data_prev_name"] = "none";
            obj["data_prev_time"] = "none";
            obj["background_image"] = data_image_url;
            obj["background_color"] = "none";
            obj["background_size"] = "cover";
        }
        old_Use_BgArr.unshift(obj);
        if (old_Use_BgArr.length > 2) {
            old_Use_BgArr = old_Use_BgArr.splice(0, 2);
        }
        //每次点击横条样式中的内容都要把本地localStorage存储的“使用过的背景”进行更新
        localStorage.setItem("old_Use_Bg", JSON.stringify(old_Use_BgArr));

        zmEditor.component.banner.isVideo(iSelected);
    },
    //整个横条拖拽事件
    dragDrop: function (w, h, component) {
        var iSelected = zmEditor.component.nowEdit();
        var iSelectedWidth = parseInt(iSelected.css("width"));
        var bodyWidth = component.closest(".zm-body").width();
        //当通过拖动盒子面的小圆点来改变盒子的高宽，当盒子的宽小于浏览器的屏幕宽时则盒子可以左右拖动，否者就不可以左右拖动
        if (w < bodyWidth || iSelectedWidth < bodyWidth) {
            component.closest(".zm-component-box1").attr("data-fullscreen", "false");
        } else {
            component.closest(".zm-component-box1").attr("data-fullscreen", "true");
        }
        //移除列标签
        $(".banner-Column-label").remove();
        iSelected.find("div").removeClass("nowIsSelect");//移除选中边框类
        //记录并更新横条总宽度
        zmEditor.component.banner.old_totalWidth = parseFloat(iSelected.css("width"));
    },
    //右侧添加列
    bannerRightAdd: function () {
        //移除列标签
        $(".banner-Column-label").remove();
        var iSelected = zmEditor.component.nowEdit();
        if (iSelected.children(".zm-component-banner-combination").length >= 5) {
            alert("亲，该横条最多只能添加到五列哟！！！");
            return;
        }
        var RightAddBtn = $(".zm-component-edit").find(".zm-bannerRightAdd");
        var bannerrightaddindex = RightAddBtn.attr("data-zm-bannerrightaddindex");

        var nowIsSelected = iSelected.children(".zm-component-banner-combination");

        if (bannerrightaddindex) {
            //当前被选中的的列
            var nowIsSelectedTrue = nowIsSelected.eq(bannerrightaddindex);
            //克隆当前被选中的列
            var newSelected = nowIsSelected.eq(bannerrightaddindex).clone(true);
        } else {
            //当前被选中的的列
            var nowIsSelectedTrue;
            nowIsSelected.each(function (index, ele) {
                if ($(ele).hasClass("zm-component-banner") && $(ele).hasClass("nowIsSelect")) {
                    nowIsSelectedTrue = $(this);
                }
            });
            //克隆当前被选中的列
            var newSelected = nowIsSelectedTrue.clone(true);
        }
        newSelected.removeClass("nowIsSelect");
        newSelected.removeClass("zm-component-banner");
        newSelected.find(".zm-banner-resizeL").remove();
        newSelected.find(".zm-banner-resizeR").remove();
        //克隆后的列添加到当前被选中的列的后面
        newSelected.insertAfter(nowIsSelectedTrue);
        //重新计算列数
        var nowIsSelected2 = iSelected.children(".zm-component-banner-combination");
        var count = nowIsSelected2.length;
        var newWidth = 1 / count * 100 + "%";
        nowIsSelected2.css({"width": newWidth, "height": "100%"});
    },
    //横条在有多列的情况下当前被选中列右移
    bannerRightMove: function () {

        //克隆后的列添加到当前被选中的列的后面
        var iSelected = zmEditor.component.nowEdit();

        iSelected.children(".zm-component-banner").find("span.span-video").css("display","block");

        //移除列标签
        $(".banner-Column-label").remove();
        //移除左拖动器
        iSelected.find(".zm-banner-resizeL").remove();
        //移除右拖动器
        iSelected.find(".zm-banner-resizeR").remove();

        var mainChildren = iSelected.children(".zm-component-banner-combination");
        mainChildren.each(function (index, ele) {
            if ($(ele).hasClass("zm-component-banner")) {
                //如果当前被选中的列为最后一列就不再进行右移了，并中断程序的下一步运行
                if (index == (mainChildren.length - 1)) {
                    return;
                }
                //克隆当前被选中的的列
                var _this = $(this).clone(true);
                //克隆当前被选中的列的位置被下一列替换
                var nextEle = mainChildren.eq(index + 1).clone(true);
                //当前被选中的列的位置被下一列替换
                mainChildren.eq(index).replaceWith(nextEle);
                //当前被选中的列的下一列位置被上一列替换
                mainChildren.eq(index + 1).replaceWith(_this);
            }
        });
        //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
        zmEditor.component.showOption(zmEditor.component.nowBox1());
        $("#zm-component-edit").css("left", zmEditor.component.banner.zm_component_edit_left);
    },
    //横条在有多列的情况下当前被选中列左移
    bannerLeftMove: function () {

        $("#zm-component-edit").css("left", zmEditor.component.banner.zm_component_edit_left);
        var iSelected = zmEditor.component.nowEdit();
        iSelected.children(".zm-component-banner").find("span.span-video").css("display","block");
        //移除列标签
        $(".banner-Column-label").remove();
        //移除左拖动器
        iSelected.find(".zm-banner-resizeL").remove();
        //移除右拖动器
        iSelected.find(".zm-banner-resizeR").remove();
        var mainChildren = iSelected.children(".zm-component-banner-combination");
        mainChildren.each(function (index, ele) {
            if ($(ele).hasClass("zm-component-banner")) {
                //如果当前被选中的列为第一列就不再进行左移了，并中断程序的下一步运行
                if (index == 0) {
                    return;
                }
                //克隆当前被选中的的列
                var _this = $(this).clone(true);
                //克隆当前被选中的的列的前一列
                var preEle = mainChildren.eq(index - 1).clone(true);
                //当前被选中的列的位置被前一列替换
                mainChildren.eq(index).replaceWith(preEle);
                //当前被选中的列的前一列位置被后一列替换
                mainChildren.eq(index - 1).replaceWith(_this);

            }
        });
        //下面这行代码是为了多次触发zmEditor.component.showOption事件,不要再绑到document上面,以免出现第一次双击之后才会出现效果
        zmEditor.component.showOption(zmEditor.component.nowBox1());
        $("#zm-component-edit").css("left", zmEditor.component.banner.zm_component_edit_left);
    },
    //在横条有多列情况下点击删除按钮
    bannerDel: function () {
        //在这里改变isMove的真假是因为只要删除了其中的列，剩余的列重新平均分配横条的总宽度，所以不能执行zmEditor.component.banner.dragbanner
        //方法中的document.onmouseup中的四舍五入百分比取整来分配横条的总宽度,所以要把zmEditor.component.banner.isMove的值变为false
        zmEditor.component.banner.isMove = false;
        var delBtn = $(".zm-component-edit").find(".bannerDel");
        var index = delBtn.attr("data-zm-delindex");
        var zm_body_width = $(".zm-body").width();
        var iSelected = zmEditor.component.nowEdit();
        var nowIsSelected = iSelected.children(".zm-component-banner-combination");

        //这个判断是为了在删除列的时候只能删除当前被选中的列(仿照wix的删除方式)================================================start
        iSelected.children(".zm-component-banner-combination").each(function (index, ele) {
            if ($(ele).hasClass("zm-component-banner")) {
                //当被选中的当前列是第一列的时候，它的下列一列就是即将被删除的列
                if (index == 0) {
                    iSelected.children(".zm-component-banner-combination").eq(index + 1).addClass("zm-component-banner");
                    iSelected.children(".zm-component-banner-combination").eq(index + 1).addClass("nowIsSelect");
                    //先给下一列添加选中的相关类，再删除当前类
                    $(this).remove();
                    //返回 'false' 将停止循环 (就像在普通的循环中使用 'break')。返回 'true' 跳至下一个循环(就像在普通的循环中使用'continue')。
                    return false;
                }
                if (index != 0) {
                    iSelected.children(".zm-component-banner-combination").eq(index - 1).addClass("zm-component-banner");
                    iSelected.children(".zm-component-banner-combination").eq(index - 1).addClass("nowIsSelect");
                    //先给前一列添加选中的相关类，再删除当前类
                    $(this).remove();
                    //返回 'false' 将停止循环 (就像在普通的循环中使用 'break')。返回 'true' 跳至下一个循环(就像在普通的循环中使用'continue')。
                    return false;
                }
            }
        });
        //这个判断是为了在删除列的时候只能删除当前被选中的列(仿照wix的删除方式)==================================================end

        //nowIsSelected移除之后重新获取nowIsSelected(因为个数发生了变化)
        var nowIsSelected = iSelected.children(".zm-component-banner-combination");
        var box1 = iSelected.closest('.zm-component-box1');
        //判断当多列横条中只有一列的时候左移和右移按钮不显示
        if (nowIsSelected.length == 1) {
            //移除左移按钮
            $(".zm-component-edit").find(".zm-bannerLeftMove").remove();
            //移除右移按钮
            $(".zm-component-edit").find(".zm-bannerRightMove").remove();

        }
        if (nowIsSelected.length == 0) {
            $(".zm-component-edit").hide();
            iSelected.closest(".zm-component-box1").remove();
        }
        //当前被选中的列被删除之后，让删除按钮的data-zm-delindex属性值置为空，避免了删除点当前列的时候在没有选中其他列的时候点击删除按钮还能删除其它列
        $(".zm-component-edit").find(".bannerDel").attr("data-zm-delindex", "");
        $(".zm-component-edit").find(".zm-bannerRightAdd").attr("data-zm-bannerrightaddindex", "");
        $(".zm-component-edit").find(".zm-bannerRightMove").attr("data-zm-bannerrightmove", "");
        $(".zm-component-edit").find(".zm-bannerLeftMove").attr("data-zm-bannerleftmove", "");

        //获取横条删除之前的总宽度
        // var totalWidth = zmEditor.component.banner.old_totalWidth + "px";
        var totalWidth = zmEditor.component.banner.old_totalWidth;
        //剩余列的宽度平均分配横条总宽度
        newWidth = 1 / nowIsSelected.length * 100 + "%";
        nowIsSelected.css({"width": newWidth, "height": "100%"});
        iSelected.css("width", totalWidth);

        //判断横条宽度是否小于屏幕宽度
        if (iSelected.width() < zm_body_width) {
            box1.attr("data-fullscreen", "false");
        } else {
            box1.attr("data-fullscreen", "true");
        }
        // 当被编辑框的宽高突然改变的时候（并不是通过拖动改变的宽高），让外围的八个小圆点及时跟着变化
        zmEditor.component.banner.dotRecovery();
    },
    //给document注册点击事件，在zmEditor.js中zmEditor.component.didMount方法中case "banner"中初始化
    init: function () {
        //点击页面任意非组件存在位置，显示改变页面背景按钮
        $(document).on('mousedown', '.zm-main', function (e) {
            //排除鼠标右键的情况
            if (e.button == 0) {
                var tag = $(e.target);
                if (tag.closest(".zm-component-box1").length == 0 && tag.closest(".zm-row-full").length != 0) {
                    zmEditor.component.showOption(undefined, 'row', tag, e.pageX, e.pageY);
                }
            }
        });
        //当前被编辑框以外的点击事件
        $(document).on("click", function (event) {
            var e=window.event||event;
            e.stopPropagation();
            var iSelected = zmEditor.component.nowEdit();
            var box1 = iSelected.closest(".zm-component-box1");
            var combination_son = $(".zm-component-banner-combination");
            //判断点击的不是横条区域
            if ($(e.target).hasClass("zm-body") || $(e.target).hasClass("zm-head") || $(e.target).hasClass("zm-foot") || $(e.target).hasClass("zm-row-empty")) {
                $(".zm-main-banner-vein").css({"display": "block", "z-index": 1, "background-color": "rgba(0,0,0,.0)"});
                combination_son.eq(0).parent(".zm-component-main-combination").removeClass("nowIsSelect");//添加选中边框类
                combination_son.eq(0).parent(".zm-component-main-combination").addClass("reborder");//去除选中边框类
                //横条外围的八个点出现
                $(".zm-component-resize").removeClass("dothid").addClass("dotshow");

                //当点击的是编辑框外部的时候，不让其中的列进行四色五入取整进行百分比计算，所以zmEditor.component.banner.isMove的值要变为false
                zmEditor.component.banner.isMove = false;
                if (combination_son.length) {
                    for (var i = 0; i < combination_son.length; i++) {
                        //当点击横条区域外时，横条中的列移除类.nowIsSelect
                        combination_son.eq(i).removeClass("nowIsSelect");
                        //当点击横条区域外时，横条中的列移除类zm-component-banner
                        combination_son.eq(i).removeClass("zm-component-banner");
                        combination_son.eq(i).children(".zm-banner-resizeR").remove();
                        combination_son.eq(i).children(".zm-banner-resizeL").remove();
                    }
                }
                //移除列标签
                $(".banner-Column-label").remove();
            }
            //在多列横条中如果整个横条在页面中的宽度大于或小于$(".zm-component-pageCont").width()的宽度时，组件编辑按钮区显示的位置也会跟着改变
            if ($(e.target).hasClass("zm-bg-banner-vein") || $(e.target).hasClass("zm-bg-banner-BGC")) {//判断点击的对象是属于横条中的列而不是整个横条
                if (iSelected.width() > $(".zm-component-pageCont").width()) {
                    $("#zm-component-edit").css({"left": $(e.target).offset().left + $("#zm-component-edit").width() / 2 + 140 + "px"});
                } else {
                    $("#zm-component-edit").css({"left": $(e.target).offset().left + 140 + "px"});
                }
                //当单击选中某一列时，记录此时“组件编辑区的left的值”，当对列进行左移或者右移的时候，“组件编辑区的left的值”恒定为此时的left值
                zmEditor.component.banner.zm_component_edit_left = $("#zm-component-edit").css("left");
            }
            document.onmouseup = null;
        });
    },
    /*记录删除列数之前横条的总宽度
     *old_totalWidth的作用:当横条有多列的情况下，当在点击删除按钮之前先把横条目前的宽度先记录下来，保存到zmEditor.component.banner.old_totalWidth中
     * 当删除掉某一列的时候，剩余的列数的宽度平均分配old_totalWidth这个总宽度，注意当拖拽或满屏或取消满屏时都会更新old_totalWidth的值。(参照Wix的做法)
     */
    old_totalWidth: null,
    /*isMove布尔值的真假用来判断用户是否触动onmousemove事件（类似开关的作用）,控制是否要以四舍五入的方式进行各列的百分比计算，还是以列数除以
     *横条总宽度得到的百分比的方式进行计算
     */
    isMove: false,
    /*每次点击对应列的拖动器之前先记录横条的data-fullscreen属性值，因为在点击拖动器的时候zm-component-box1的data-fullscreen属性值一定是
     *false，主要是为了在拖动的时候不让横条左右移动，在拖动完毕并松开鼠标是再把原来data-fullscreen属性的值重新变为原来的值，即zmEditor.component.banner.fullscreen
     */
    fullscreen: null,
    //保存高宽比例，刚从横条组件中拖出横条的时候按比例放大
    Proportion: null,
    //当在组合横条中要点击拖动器对列进行宽度的拖动的时候，此时记录整个横条在页面中距离浏览器顶部的距离，达到横条上下不移动的效果
    box1_top: null,
    //当拖动第一列的左拖动器的时候，此时zm-component-main的left值赋值给box1的left并记录
    box1Left: 0,
    //在移动横条中第一列的左拖动器的时候记录移动的距离（包含正负）
    totalMove: 0,
    /*当单击选中某一列时记录此时“组件编辑区的left的值”，如果对选中的列进行左移和右移时，此时“组件编辑区的left的值”就不会发生改变，
     *而是以你单击某一列时，此时“组件编辑区的left的值”为准，除非再次单击选中某一列，“组件编辑区的left的值”才可能发生变化
     */
    zm_component_edit_left: "",
    /*当拖动第一列的左拖动器改变宽度的时候，会出现整个横条的宽度大于所有列实际宽度之和的问题，此时所有列的实际宽度之和才是横条的真是宽度
     *在拖动的过程中用realWidth变量来记录实际的宽度，当横条的宽度大于所有列实际宽度之和的时候再把这个变量赋值给。zm-component-main的width
     */
    realWidth: 0,
    mainnowColor:"",
    html:'<div class="zm-edit-component-banner-videoBtn">'
         +'<span class="banner-videoBtn-play" style="display:none;">'
         +'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" style="display:block;">'
         +'<path d="M428.859077 296.093538c-5.632-3.899077-12.878769-4.371692-18.865231-1.181538-6.025846 3.150769-9.806769 9.373538-9.806769 16.187077l0 417.988923c0 6.852923 3.859692 13.154462 10.043077 16.265846 2.56 1.339077 5.395692 2.008615 8.231385 2.008615 3.820308 0 7.601231-1.220923 10.791385-3.544615l292.548923-214.449231c4.765538-3.505231 7.522462-9.019077 7.443692-14.966154s-2.993231-11.421538-7.837538-14.808615L428.859077 296.093538z"></path>'
         +'<path d="M512 0C229.691077 0 0 229.691077 0 512c0 282.308923 229.691077 512 512 512 282.308923 0 512-229.691077 512-512C1024 229.691077 794.308923 0 512 0zM512 926.404923C283.490462 926.404923 97.595077 740.509538 97.595077 512 97.595077 283.490462 283.490462 97.595077 512 97.595077c228.509538 0 414.404923 185.895385 414.404923 414.404923C926.404923 740.509538 740.509538 926.404923 512 926.404923z"></path>'
         +'</svg>'
         +'</span>'
         +'<span class="banner-videoBtn-pause" style="display:none;">'
         +'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">'
         +'<path d="M512 0C229.216 0 0 229.216 0 512s229.216 512 512 512 512-229.216 512-512S794.784 0 512 0z m0 928C282.24 928 96 741.76 96 512S282.24 96 512 96s416 186.24 416 416-186.24 416-416 416z m-192-608h128v384h-128z m256 0h128v384h-128z"></path>'
         +'</svg>'
         +'</span>'
         +'</div>',
};