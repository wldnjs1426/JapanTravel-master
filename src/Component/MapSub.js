import Axios from 'axios';
import Paging from './Paging';
import Map from './Map';
import Nav from './Nav';
import Loading from './Loading';
import { useForm } from "react-hook-form";
import { Link,useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import styled from "styled-components";
import Footer from './Footer';


  const Div = styled.div`
    display: flex;
    align-items: flex-end;
    width:1fr;
    height: 87vh;
  `;
  const Form = styled.form`
    width: 50%;
    height:90%;
  `;
  const SubDiv = styled.div`
    width: 100%;
    height:100%;
    background-color: white;
  `
  const SearchSection = styled.section`
    width: 100%;
    height: 30%;
    display:flex;
    flex-direction: column;
    align-items: center;

    `
  const SubSection = styled.section`
    width: 90%;
    height: 40%;
    display: flex;
    border-bottom:1px solid #8C4216;
  `
  const Article = styled.article`
    width: 30%;
    height: 100%;
    display: flex;
    border-right:1px solid #ececec;
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
    padding: .8em .5em; 
    border: 1px solid #999;
    font-size:11px;
    font-family: inherit;  
    background: url('/image/icon/arrow.png') no-repeat 95% 50%; 
    background-size: 12px 12px;
    border-radius: 5px; 
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
  `
  const SubmitDiv = styled.div`
    width: 100%;
    height: 15%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  `
  const CategorySection = styled.section`
    width: 100%;
    height: 65%;
    background-color: white;

  `
  const Ul = styled.ul`
    width:90%;
    margin: 0 auto;
    
  `
  const Li = styled.li`
    width: 100%;
    height: 135px;
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
    width:80%;
    display:flex;
    flex-direction: column;
    justify-contents:center;
  `
  const LiDivP = styled.p`
    color:gray;
    font-size:12px;
    font-weight:400;
  `
  const HeaderP = styled.p`
    font-weight: 550;
  `
  const PageLi = styled.li`
    display:flex;
    height:100px;
    justify-content: center;
    align-items: center;
  `
  const ButtonDiv = styled.div`
    display:flex;  
    justify-content: flex-end;
    margin-bottom:10px;
  `
  const ImgDiv = styled.div`
    width:20%;
    height:135px;
  `
  const Img = styled.img`
    width: 100%;
    height: 100%;
  `
  const MapDiv = styled.div`
    width:50%;
    height:90%;
    position:fixed;
    right:0;
    bottom:0;
  `
  const Input = styled.input`
    box-shadow:inset 0px 1px 0px 0px #cf866c;
    background:linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
    background-color:#d0451b;
    border-radius:3px;
    border:1px solid #942911;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-size:12px;
    padding:6px 24px;
    text-decoration:none;
    text-shadow:0px 1px 0px #854629;
  `
  const FooterDiv = styled.div`
    margin-top:20px;
    width:99%;
    height:150px;
    margin:0 auto;
`
  const Button = styled.button`
      box-shadow:inset 0px 1px 0px 0px #cf866c;
      background:linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
      background-color:#d0451b;
      border-radius:3px;
      border:1px solid #942911;
      display:inline-block;
      cursor:pointer;
      color:#ffffff;
      font-family:Arial;
      font-size:12px;
      padding:6px 24px;
      text-decoration:none;
      text-shadow:0px 1px 0px #854629;
  `
 
 function MapSub() {

  const MapMemo = React.memo(Map)
  const NavMemo = React.memo(Nav)
  const cookies = new Cookies();
  const [loadingList, setLoadingList] = useState(true);

  


  //Category 파라미터 전달 받아 Search 데이터 입력
  const categoryParam = useParams().Category
  const [Areadata, setAreadata] = useState([]);
  const [Search, setSearch] = useState({
    Area : "null",
    Category : categoryParam
  })
  const [Arcd, setArcd] = useState()
  const [Cacd, setCacd] = useState()
  const [areaKorea, setareaKorea] = useState("전체")
  const [categoryKorea, setcategoryKorea] = useState("관광지")

  //Paging
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [totalposts, settotalposts] = useState();
  
  //Map
  let lat = 0 ;
  let lng = 0 ;
  for(var i=0 ; i <Areadata.length ; i++){
    lat = lat + Areadata[i].coordinate_lat
    lng = lng + Areadata[i].coordinate_lng
  }
    lat = lat / Areadata.length
    lng = lng / Areadata.length
  const center = {
      lat: lat,
      lng: lng
    }
    
  //DB연동 후 조건에 맞는 쿼리문 입력 후 데이터 출력
  useEffect(()=>{
    var setLoading = setTimeout(()=>setLoadingList(false),2000)
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
    return () => clearTimeout(setLoading);

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
    //Nav 에 보낼 변수값 세팅
    setareaKorea(data.Area.substring(data.Area.indexOf(",")+1))
    setcategoryKorea(data.Category.substring(data.Category.indexOf(",")+1))
    }
  };

  //Map컴포넌트 안에 Maker컴포넌트와 연동
  const [hover,setHover] = useState(false)
  const [id,setId] = useState()
  const mouseHover = (id)=>{
    setHover(true)
    setId(id)
  }


return( 
    <>
    {loadingList ? <Loading />: 
      <Div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SubDiv>
            <NavMemo Area={areaKorea} Category={categoryKorea}/>
            <SearchSection>
              <SubSection>
                <Article>지역</Article>
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
                      <option  key={data.id} value={data.target_table +`,`+ data.category_nm}>{data.category_nm}</option>
                    ))}
                  </Select>
                </SubArticle>
              </SubSection>
              <SubmitDiv>
                <Input type="submit" value="검색" />
              </SubmitDiv>
            </SearchSection>
            
            <CategorySection>
              <Ul>
                {/* DB리스트 length만큼 반복해서 데이터 출력 */}
                {
                Areadata.map(data => (
                      <Link key={data.id} className="list" to={`/detail/${data.id}/${Search.Category}/${data.Area}/${data.detail_nm}`}>
                        <Li onMouseOver={()=>mouseHover(data.id)} >
                          <ImgDiv>
                            <Img src={`${data.Thumbnail_img}`} alt={data.Tourlist_name} />
                          </ImgDiv>
                          <LiDiv>
                            <span>
                              <HeaderP>{data.name}</HeaderP>
                              <LiDivP>({data.Japan_name})</LiDivP>
                            </span>
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
                {cookies.get('token') === undefined ? <></> : <ButtonDiv>
                <Link to={`/admin/false/false`}>
                    <Button>글쓰기</Button>
                </Link>
                </ButtonDiv>}
                

                
                
              </Ul>
              <FooterDiv>
                <Footer />
              </FooterDiv>
            </CategorySection>
        </SubDiv>
      </Form>
      
        {/* 맵 컴포넌트 호출 */}
        <MapDiv>
          <MapMemo 
          center={center} 
          Areadata={Areadata} 
          hover={hover} 
          id={id}
          category={Search.Category}
          />
        </MapDiv>
        
      </Div>
    }
    </>
)
};
export default MapSub;
