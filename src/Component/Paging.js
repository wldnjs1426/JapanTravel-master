import React, { useState } from "react";
import '../static/Paging.css';
import Pagination from "react-js-pagination";

function Paging(props){

const [page, setPage] = useState(1);
const data = props.Areadata;
const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
    props.paginate(page);
  };
let num = 0 ;
for(var i = 0 ; i < data.length ; i++){
    if(data.length % 5 === 0){
        num = num + 1
    }
}

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={data.length}
      pageRangeDisplayed={num}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;