ams.block('userTagScriptTest', {
    blocks: {
        tagScriptForm: {
            type: 'form',
            ctx: 'edit',
            resource: {
                fields: {
                    testScript: {
                        label: '表达式',
                        type: 'textarea',
                        style:{
                            width:'600px',
                        }
                    },
                    arrayField: {
                        label: "参数数组",
                        type: "array",
                        field: {
                            label: "参数",
                            type: "text",
                            props:{
                            },
                            style:{
                                width:'200px',
                            }
                        },
                    },
                    // param2: {
                    //     label: '参数2',
                    //     type: 'text'
                    // },
                    resultArea: {
                        // hidden: true,
                        label: '测试结果',
                        type: 'textarea',
                        style:{
                            width:'600px',
                        }
                    },
                }
            },
            operations: {
                submit: {
                    type: 'button',
                    label: '测试',
                    props: {
                        type: 'primary'
                    },
                    event: 'submit'
                },
                hide: {
                    type: 'button',
                    label: '关闭',
                    event: 'close'
                }
            },
            events: {
                submit: '@validate @testScript',
                close: '@newDialogBlock.hide'
            },
            actions: {
                init() {

                },
                clear() {
                    this.data = {}
                },
                async testScript() {
                    // ams.$blocks.tagScriptForm.loading = true;
                    // let testMap = {};
                    // testMap['var1'] = 1;
                    // testMap['var2'] = 2;
                    let params = {};
                    params.el = this.data.testScript;
                    let paramMap = this.data.arrayField;
                    console.info(paramMap);
                    params.paramJson = JSON.stringify(paramMap);

                    params = Object.keys(params)
                        .map(key => params[key] && `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                        .join('&');
                    const res = await ams.request({
                        url: 'execEL.do?el=' + params,
                        method: 'POST',
                    });
                    if (res) {
                        console.info(res);

                        this.data.resultArea = JSON.stringify(res, null, '  ');
                    }
                    // ams.$blocks.tagScriptForm.loading = false;
                    // ams.$blocks.tagScriptForm.fields.resultArea.hidden = false;
                    // ams.$blocks.tagScriptForm.fields.resultArea.style = {display:'block'};
                }
            }
        }
    }
});
