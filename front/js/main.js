fetch('http://localhost:3000/api/products')

  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)
    const mainBlock = document.querySelector('main .limitedWidthBlock')
    const section = document.getElementById('items')
    mainBlock.appendChild(section)

    // check for each sofa in the table
    for (let kanap of data) {

      //add href attribute to send to the product page when clicked
      const sectionA = document.createElement('a')
      section.appendChild(sectionA)
      sectionA.href = `./product.html?id=${kanap._id}`
      const sectionArticle = document.createElement('article')
      sectionA.appendChild(sectionArticle)

      // get urlimage and alt of each element
      const articleImg = document.createElement('img')
      articleImg.src = kanap.imageUrl
      articleImg.alt = kanap.altTxt
      sectionArticle.appendChild(articleImg)

      const articleH3 = document.createElement('h3')
      articleH3.classList.add('productName')

      sectionArticle.appendChild(articleH3)
      articleH3.innerHTML = kanap.name

      // get the name for each element and insert it in h3
      const articleP = document.createElement('p')
      articleP.classList.add('productDescription')
      sectionArticle.appendChild(articleP)
      articleP.innerHTML = kanap.description
    }
  })
