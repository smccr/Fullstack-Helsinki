const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.map(blog => likes += blog.likes)
  return likes
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let BlogMostLikes = null
  blogs.map(blog => {
    if (blog.likes > mostLikes) {
      BlogMostLikes = blog
      mostLikes = blog.likes
    }
  })
  return BlogMostLikes
}

const mostBlogs = (blogs) => {
  authors = []
  blogs.map(blog => {
    let alreadyAdded = false;
    for(const i in authors) {
      if(authors[i].author === blog.author) {
        authors[i].blogs++;
        alreadyAdded = true;
        break;
      }
    }
    if(!alreadyAdded) {
      authors.push({ author: blog.author, blogs: 1 })
    }
  })
  let max = 0
  let maxAuthor = null
  authors.map(author => {
    if(author.blogs > max){
      max = author.blogs
      maxAuthor = author
    }
  })
  return maxAuthor
}

const mostLikes = (blogs) => {
  authors = []
  blogs.map(blog => {
    let alreadyAdded = false;
    for(const i in authors) {
      if(authors[i].author === blog.author) {
        authors[i].likes += blog.likes;
        alreadyAdded = true;
        break;
      }
    }
    if(!alreadyAdded) {
      authors.push({ author: blog.author, likes: blog.likes })
    }
  })
  let max = 0
  let maxAuthor = null
  authors.map(author => {
    if(author.likes > max){
      max = author.likes
      maxAuthor = author
    }
  })
  return maxAuthor

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}