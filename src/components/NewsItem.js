import React from "react";

const NewsItem = (props) => {
      // in react function based components(rfc), we pass props as function argument
      // in react class based components(rcc), we access props using this.props

      // props is object in both rfc and rcc, so this.props is a object
      // we want only title, description and imageUrl from the props object, so we can do object destructuring in which we desturcture props and fetch only title, description and imageUrl.
    //   (props object contains all the fields passed to the component)
      let {title,description, imageUrl, newsUrl, author, date,source} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
          <span className="badge rounded-pill bg-danger" >{source} </span>
          </div>
          <img src={imageUrl?imageUrl :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8cslhpo8djEht6OcYr9lv772BbK0ArXLDiCJASpBY4sVDTgUTzqIHpP0rJeMfH4UE1Pw&usqp=CAU"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title.slice(0,100)}</h5>
            <p className="card-text"> {description.slice(0,100)}...</p>
            {/* <p className=“card-text”><small class=“text-muted”>By {author} on {date}</small></p> */}
            <p className="card-text"><small className="text-muted">By {author} on {(new Date(date)).toGMTString() } </small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem
