export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1', value: 'h1' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],

      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
          {
            title: 'Text Color',
            name: 'textColor',
            type: 'object',
            fields: [
              {
                title: 'Color',
                name: 'color',
                type: 'string',
                options: {
                  list: [
                    { title: 'Red', value: '#EF4444' },
                    { title: 'Green', value: '#16803C' },
                    { title: 'Blue', value: 'blue' },
                    { title: 'Yellow', value: '#EAB305' },
                    // Add more colors as needed
                  ],
                },
              },
            ],
          },
          {
            title: 'Font Family',
            name: 'fontFamily',
            type: 'object',
            fields: [
              {
                title: 'Font',
                name: 'font',
                type: 'string',
                options: {
                  list: [
                    { title: 'Roboto', value: 'roboto' },
                    // Add more fonts as needed
                  ],
                },
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Code',
      name: 'code',
      type: 'object',
      fields: [
        {
          title: 'Code',
          name: 'code',
          type: 'text',
          rows: 20, // Adjust the number of rows as needed
        },
      ],

    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          title: 'URL',
          name: 'url',
          type: 'url',
        },
      ],
    },
  ],
};
