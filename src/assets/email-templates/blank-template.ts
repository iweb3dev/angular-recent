export const BLANK_TEMPLATE = {
  counters: {
    u_row: 1,
    u_column: 1,
    u_content_text: 1,
  },
  body: {
    rows: [
      {
        cells: [1],
        columns: [
          {
            contents: [
              {
                type: 'text',
                values: {
                  containerPadding: '10px',
                  _meta: {
                    htmlID: 'u_content_text_1',
                    htmlClassNames: 'u_content_text',
                  },
                  selectable: true,
                  draggable: true,
                  deletable: true,
                  color: '#000',
                  textAlign: 'left',
                  lineHeight: '140%',
                  text:
                    '<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 14px; line-height: 19.6px;">Hi Guys,</span></p>\n<p style="line-height: 140%; font-size: 14px;">&nbsp;</p>\n<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 14px; line-height: 19.6px;">This is a text box that you can enter text! Enjoy!</span></p>\n<p style="line-height: 140%; font-size: 14px;">&nbsp;</p>\n<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 14px; line-height: 19.6px;">Thanks,</span></p>\n<p style="line-height: 140%; font-size: 14px;">&nbsp;</p>\n<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 14px; line-height: 19.6px;">CallingPost</span></p>',
                },
              },
            ],
            values: {
              _meta: {
                htmlID: 'u_column_1',
                htmlClassNames: 'u_column',
              },
            },
          },
        ],
        values: {
          columns: false,
          backgroundColor: '',
          columnsBackgroundColor: '',
          backgroundImage: {
            url: '',
            fullWidth: true,
            repeat: false,
            center: true,
            cover: false,
          },
          padding: '10px',
          hideMobile: false,
          noStackMobile: false,
          _meta: {
            htmlID: 'u_row_1',
            htmlClassNames: 'u_row',
          },
          selectable: true,
          draggable: true,
          deletable: true,
        },
      },
    ],
    values: {
      backgroundColor: '#ffffff',
      backgroundImage: {
        url: '',
        fullWidth: true,
        repeat: false,
        center: true,
        cover: false,
      },
      contentWidth: '500px',
      fontFamily: {
        label: 'Arial',
        value: 'arial,helvetica,sans-serif',
      },
      _meta: {
        htmlID: 'u_body',
        htmlClassNames: 'u_body',
      },
    },
  },
};
