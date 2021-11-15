import Axios from 'axios';
import Paging from '../Paging';
import Loading from '../Loading';
import { useForm } from "react-hook-form";
import { Link,useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import FooterMobile from './FooterMobile';

  const Div = styled.div`
    width:100%;
    height: 87vh;
  `;
  const Form = styled.form`
    width: 100%;
  `;
  const SearchSection = styled.section`
    background-color: white;
    width: 100%;
    height:200px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    `
  const SubSection = styled.section`
    width: 90%;
    height: 30%;
    display: flex;
    border-bottom:1px solid #8C4216;
  `
  const Article = styled.article`
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;    
  `
  const SubArticle = styled.article`
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
  `
  const Select = styled.select`
    width: 200px;
    height: 30px;
  `
  const SubmitDiv = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  `
  const CategorySection = styled.section`
    width: 100%;
    background-color: white;
  `
  const Ul = styled.ul`
    width:100%;
    margin: 0 auto;
  `
  const Li = styled.li`
    width: 100%;
    height: 100px;
    border: 1px solid #8C4216;
    margin-bottom:5px;
    display: flex;
    align-items: center;
    &:hover{
      background: rgba(189, 188, 188, 0.411);
    }
  `
  const LiDiv = styled.div`
    margin-left:10px;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-contents:center;
    font-size:8px;
  `
  const Span = styled.span`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    color:gray;
    font-size:5px;
  `
  const HeaderP = styled.p`
    font-size:11px;
    color:black;
    font-weight: 550;
    height:3px;
  `
  const PageLi = styled.li`
    justify-content: center;
    border: none;
  `
  const ImgDiv = styled.div`
    width:30%;
    height:100%;
  `
  const Img = styled.img`
    width: 100%;
    height: 100%;
  `
  const FooterMobileDiv = styled.div`
    margin-top:20px;
    width:99%;
    height:70px;
`
 
 function MapSub() {

  const [loadingList, setLoadingList] = useState(true);

  setTimeout(()=>setLoadingList(false),1000)


  //Category 파라미터 전달 받아 Search 데이터 입력
  const categoryParam = useParams().Category
  const [Areadata, setAreadata] = useState([]);
  const [Search, setSearch] = useState({
    Area : "null",
    Category : categoryParam
  })
  const [Arcd, setArcd] = useState([])
  const [Cacd, setCacd] = useState([])

  //Paging
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [totalposts, settotalposts] = useState([]);
  
  
  //DB연동 후 조건에 맞는 쿼리문 입력 후 데이터 출력
  useEffect(()=>{
    Axios.get('http://13.209.82.0:5000/tour',{
      params: {
        Area: Search.Area,
        Category: Search.Category
      }
    }).then((response)=>{
      
        settotalposts(response.data);
        const indexOfLast = currentPage * postsPerPage;
        const indexOfFirst = indexOfLast - postsPerPage;
        setAreadata(response.data.slice(indexOfFirst, indexOfLast))
    })
  },[Search, currentPage])

  //지역,카테고리 select 박스 동적 생성
  useEffect(()=>{
    Axios.get('http://13.209.82.0:5000/tour/Area').then((response)=>{
        setArcd(response.data);        
    })
    Axios.get('http://13.209.82.0:5000/tour/Category').then((response)=>{
      setCacd(response.data);
    })
      
  },[])
  
  //useForm으로 Form 데이터 전달받음
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if(data.Category === "null"){
      alert("카테고리를 선택해 주세요")
    }else{
    if(data.Area === "null"){
      setSearch({
        Area : "null",
        Category : data.Category.substring(0,data.Category.indexOf(","))
    })
    }else{
      setSearch({
        Area      : data.Area.substring(0,data.Area.indexOf(",")),
        Category  : data.Category.substring(0,data.Category.indexOf(","))
      })
    }
    }
  };

  


return( 
    <>
      <Div>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <SearchSection>
              <SubSection>
                <Article >지역</Article>
                <SubArticle>
                  <Select name="Area" {...register("Area")} >
                    <option value="null,전체">전체</option>
                    {/* 지역 데이터 length만큼 반복해서 데이터 출력 */}
                    {Arcd.map(data => 
                    (
                      <option  key={data.id} value={data.detail_cd +`,`+ data.detail_nm} >{data.detail_nm}</option>
                    ))}
                  </Select>
                </SubArticle>
              </SubSection>
              <SubSection>
                <Article>카테고리</Article>
                <SubArticle>
                  <Select name="Category" {...register("Category")}>
                  <option value="null">===선택해 주세요===</option>
                  {/* 카테고리 데이터 length만큼 반복해서 데이터 출력 */}
                  {Cacd.map(data => (
                      <option  key={data.category_id} value={data.target_table +`,`+ data.category_nm}>{data.category_nm}</option>
                    ))}
                  </Select>
                </SubArticle>
              </SubSection>
              <SubmitDiv>
                <input type="submit" value="검색" />
              </SubmitDiv>
            </SearchSection>
            
            <CategorySection>
              <Ul>
                {/* DB리스트 length만큼 반복해서 데이터 출력 */}
                {loadingList ? <Loading />: 
                Areadata.map(data => (
                      <Link className="list" to={`/detail/${data.id}/${Search.Category}/${data.Area}/${data.detail_nm}`}>
                        <Li key={data.id} >
                          <ImgDiv>
                            <Img src={`${data.Thumbnail_img}`} alt={data.Tourlist_name} />
                          </ImgDiv>
                          <LiDiv>
                            <Span>
                              <HeaderP>{data.name}</HeaderP>
                              ({data.Japan_name})
                            </Span>
                            <p>{data.Thumbnail_text}</p>
                          </LiDiv>
                        </Li>
                      </Link>
                ))}
                <PageLi>
                  <Paging 
                    paginate={setCurrentPage} 
                    Areadata={totalposts} 
                  />
                </PageLi>
              </Ul>
            </CategorySection>
        
      </Form>
      
      <FooterMobileDiv >
                <FooterMobile />
              </FooterMobileDiv>
      </Div>
    </>
)
};
export default MapSub;
