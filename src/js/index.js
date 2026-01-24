document.addEventListener('DOMContentLoaded', function() {
            // 页面淡入效果
            document.body.style.opacity = 0;
            document.body.style.transition = 'opacity 0.8s ease';
            
            setTimeout(function() {
                document.body.style.opacity = 1;
            }, 100);
            
            // 图片加载优化
            const images = document.querySelectorAll('.gallery-item img');
            
            // 预加载图片
            images.forEach(img => {
                if (img.complete) {
                    optimizeImageDisplay(img);
                } else {
                    img.addEventListener('load', function() {
                        optimizeImageDisplay(this);
                    });
                    
                    img.addEventListener('error', function() {
                        console.log('图片加载失败:', this.src);
                        this.style.backgroundColor = '#333';
                        this.style.display = 'flex';
                        this.style.alignItems = 'center';
                        this.style.justifyContent = 'center';
                        this.innerHTML = '<span style="color:#888;font-size:1.2rem;">图片加载失败</span>';
                    });
                }
            });
            
            // 优化图片显示的函数
            function optimizeImageDisplay(imgElement) {
                imgElement.style.opacity = 1;
                
                const naturalWidth = imgElement.naturalWidth;
                const naturalHeight = imgElement.naturalHeight;
                
                if (naturalWidth > naturalHeight * 1.5) {
                    imgElement.style.objectPosition = 'center 30%';
                } else if (naturalHeight > naturalWidth * 1.5) {
                    imgElement.style.objectPosition = 'center 25%';
                } else {
                    imgElement.style.objectPosition = 'center center';
                }
            }
            
            // 响应窗口大小变化
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    images.forEach(img => {
                        if (img.complete) {
                            optimizeImageDisplay(img);
                        }
                    });
                }, 200);
            });
            
            // 微信小程序跳转功能
            const wechatLink = document.getElementById('wechat-link');
            const wechatTooltip = document.getElementById('wechat-tooltip');
            
            // 鼠标悬停显示提示框
            wechatLink.addEventListener('mouseenter', function() {
                wechatTooltip.style.opacity = '1';
                wechatTooltip.style.visibility = 'visible';
            });
            
            wechatLink.addEventListener('mouseleave', function() {
                wechatTooltip.style.opacity = '0';
                wechatTooltip.style.visibility = 'hidden';
            });
            
            // 点击跳转微信小程序
            wechatLink.addEventListener('click', function(event) {
                event.preventDefault();
                
                // 提示用户
                alert('正在跳转石火电竞微信小程序...');
                
                // 这里可以替换为实际的微信小程序跳转链接
                const wechatAppLink = 'https://taix.cn/plugins/mobile/h5/mall/5489/?#/pages/index/index';
                
                // 尝试跳转到微信小程序
                try {
                    window.location.href = wechatAppLink;
                    
                    // 如果跳转失败，显示备用方案
                    setTimeout(function() {
                        if (document.hidden === false) {
                            // 跳转失败，显示二维码或备用方案
                            showWechatQRCode();
                        }
                    }, 1000);
                } catch (error) {
                    console.error('跳转失败:', error);
                    showWechatQRCode();
                }
            });
            
            // 显示微信小程序二维码或备用方案
            function showWechatQRCode() {
                const qrCodeHTML = `
                    <div style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.9);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                    ">
                        <div style="
                            background: #fff;
                            padding: 25px;
                            border-radius: 12px;
                            text-align: center;
                            max-width: 90%;
                            max-height: 90%;
                            overflow: auto;
                        ">
                            <h3 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">石火电竞微信小程序</h3>
                            <div style="
                                width: 200px;
                                height: 200px;
                                background: #f5f5f5;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin: 0 auto 15px;
                                border: 2px dashed #07c160;
                            ">
                                <div style="color: #666; font-size: 0.9rem;">
                                    请打开微信扫描二维码<br>
                                    或搜索"石火电竞"
                                </div>
                            </div>
                            <p style="color: #666; margin-bottom: 15px; font-size: 0.9rem;">
                                请在微信中搜索"石火电竞"小程序
                            </p>
                            <button onclick="closeQRCode()" style="
                                background: #dc143c;
                                color: white;
                                border: none;
                                padding: 8px 20px;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 0.9rem;
                            ">
                                关闭
                            </button>
                        </div>
                    </div>
                `;
                
                // 创建遮罩层
                const overlay = document.createElement('div');
                overlay.innerHTML = qrCodeHTML;
                overlay.id = 'wechat-qr-overlay';
                document.body.appendChild(overlay);
                
                // 添加关闭功能
                window.closeQRCode = function() {
                    const overlay = document.getElementById('wechat-qr-overlay');
                    if (overlay) {
                        overlay.remove();
                    }
                };
            }
            
            // 背景控制功能
            const bgControls = document.getElementById('bg-controls');
            const bgOpacitySlider = document.getElementById('bg-opacity');
            const opacityValue = document.getElementById('opacity-value');
            const changeBgBtn = document.getElementById('change-bg-btn');
            
            // 控制背景面板显示/隐藏（按B键切换）
            document.addEventListener('keydown', function(event) {
                if (event.key === 'b' || event.key === 'B') {
                    bgControls.style.display = bgControls.style.display === 'block' ? 'none' : 'block';
                }
            });
            
            // 调整背景透明度
            bgOpacitySlider.addEventListener('input', function() {
                const opacity = this.value;
                opacityValue.textContent = opacity + '%';
                
                // 获取并更新背景的opacity
                const bgElement = document.querySelector('body::before');
                if (bgElement) {
                    document.body.style.setProperty('--bg-opacity', opacity / 100);
                }
                
                // 直接修改style
                const styleSheet = document.styleSheets[0];
                const rules = styleSheet.cssRules || styleSheet.rules;
                
                for (let i = 0; i < rules.length; i++) {
                    if (rules[i].selectorText === 'body::before') {
                        rules[i].style.opacity = opacity / 100;
                        break;
                    }
                }
            });
            
            // 更换背景图片功能
            changeBgBtn.addEventListener('click', function() {
                const bgUrl = prompt('请输入背景图片的URL（支持本地和网络图片）:', 'images/background.jpg');
                
                if (bgUrl) {
                    // 更新背景图片
                    const styleSheet = document.styleSheets[0];
                    const rules = styleSheet.cssRules || styleSheet.rules;
                    
                    for (let i = 0; i < rules.length; i++) {
                        if (rules[i].selectorText === 'body::before') {
                            rules[i].style.backgroundImage = `url('${bgUrl}')`;
                            break;
                        }
                    }
                    
                    // 显示提示
                    alert('背景图片已更新！如果图片未显示，请检查URL是否正确。');
                }
            });
            
            // 触摸设备优化
            if ('ontouchstart' in window) {
                wechatLink.addEventListener('touchstart', function() {
                    wechatTooltip.style.opacity = '1';
                    wechatTooltip.style.visibility = 'visible';
                });
                
                wechatLink.addEventListener('touchend', function() {
                    setTimeout(function() {
                        wechatTooltip.style.opacity = '0';
                        wechatTooltip.style.visibility = 'hidden';
                    }, 2000);
                });
            }
        });