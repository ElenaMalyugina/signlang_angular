export const EditorConfig ={
    language: 'ru',
    mediaEmbed:{
      extraProviders: [
          {
              name: 'thisProvider',
              url: /^library\/uploads\/videos\/(\S*)/,
              html: match => `
                    <video oncontextmenu='return false;' controls controlsList="nodownload">
                      <source src="http://${match[0]}">    
                    </video>`
          },          
      ],
      previewsInData: true
    },
    toolbar: {
      items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
      ]
    },
    image: {
      toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
      styles: [
          'full',               
          'alignLeft',
          'alignRight'
      ]
    }
  }