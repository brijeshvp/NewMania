import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  // to capitalize first letter of category (in tab name)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // whenever url hits set loading to true
    setLoading(true)
    // fetch API is a function which takes url and returns a promise
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100); 
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMania`;
    updateNews();   
  }, [])
  
  
  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // };
  // const handleNextClick = async () => {
  //   setPage(page+1)
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    // fetch API is a function which takes url and returns a promise
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }
    return (
      <>
          <h2 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>NewsMania - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
          {loading && <Spinner />}
          <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner />} >
            <div className="container">
            <div className="row">
              {articles.map((element) => {
                  /* in bootstrap, grid has 12 cols in 1 row. One newsItem card takes 4 cols so total 3 newsItem in one row */
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 100) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 150)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Anonymous"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
              </div>
            </div>
          </InfiniteScroll>
        </>
    )
}


News.defaultProps = {
  country: "in",
  pageSize: "10",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News