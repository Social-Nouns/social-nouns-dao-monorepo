import {
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import classes from './Analytics.module.css';
import React, { useState, useEffect } from 'react';
import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { i18n } from '@lingui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
interface MyObj {
  records: [{id: string,createdTime: string,fields: {Github_stars: number,Fork_number: number,Discord_user: number,Name: string,About: string,SocialMediaLink: string,Website: string,Twitter_follower: number,Votes: number,Category: string,Logo: [{thumbnails: {small:{url: string}}}]}}];
}

const Analytics: React.FC = () => {
  const [rows, setRows] = useState({} as MyObj);
  const [rowssort, setRowsSort] = useState([] as string[]);
  const [sortnumor, setSortnumor] = useState(false);
  const [sortalpha, setSortalpha] = useState(false);
  //const [sortboosted, setSortboosted] = useState(true);
  const history = useHistory();
  
  useEffect(() => {
    async function getData() {
      const aa =('Bearer ' +  process.env.REACT_APP_AIRTABLE).toString();
      const options = {
        method: 'GET',
        headers: {
        'Authorization': aa,
        }
      };
      const response2 = await fetch('https://api.airtable.com/v0/app8zZBt6vrbccHJL/Web3/',options);
      const json2 = await response2.json();
      const response2o: MyObj = json2; 

      if(response2o !== null){
        const newarray = [] as any[];
        const statstmparray = [0,0,0];
        response2o.records.forEach((row,index) => {
          
          if(row.fields.Discord_user > statstmparray[0]){
            statstmparray[0] = row.fields.Discord_user;
          }
          if(row.fields.Github_stars > statstmparray[1]){
            statstmparray[1] = row.fields.Github_stars;
          }
          if(row.fields.Twitter_follower > statstmparray[2]){
            statstmparray[2] = row.fields.Twitter_follower;
          }
        });
        response2o.records.forEach((row,index) => {
          const score = ((row.fields.Discord_user/statstmparray[0]) + (row.fields.Github_stars/statstmparray[1]) + (row.fields.Twitter_follower/statstmparray[2])) * 10000;
          newarray.push([row.fields.Name,Math.round(score),row.id,row.fields.Votes,row.fields.Category,row.fields.Logo[0].thumbnails.small.url]);
        });
        
        newarray.sort(sortFunction);
        newarray.reverse();
        setRowsSort(newarray);
        setRows(response2o);
      }
    }
    getData();
    return () => {
      
  };
  }, []);

  const sortlist = () =>{
    const newarray = [] as any[];
    const statstmparray = [0,0,0];
    rows.records.forEach((row,index) => {
      
      if(row.fields.Discord_user > statstmparray[0]){
        statstmparray[0] = row.fields.Discord_user;
      }
      if(row.fields.Github_stars > statstmparray[1]){
        statstmparray[1] = row.fields.Github_stars;
      }
      if(row.fields.Twitter_follower > statstmparray[2]){
        statstmparray[2] = row.fields.Twitter_follower;
      }
    });
    rows.records.forEach((row,index) => {
      const score = ((row.fields.Discord_user/statstmparray[0]) + (row.fields.Github_stars/statstmparray[1]) + (row.fields.Twitter_follower/statstmparray[2])) * 10000;
      newarray.push([row.fields.Name,Math.round(score),row.id,row.fields.Votes,row.fields.Category,row.fields.Logo[0].thumbnails.small.url]);
    });
  newarray.sort(sortFunction);
  if(!sortnumor === false){
    newarray.reverse();
  }
  setSortalpha(true);
  setSortnumor(!sortnumor);
  setRowsSort(newarray);
};
/*
const sortlistByBoosted = () =>{
  const newarray = [] as any[];
  const statstmparray = [0,0,0];
  rows.records.forEach((row,index) => {
    
    if(row.fields.Discord_user > statstmparray[0]){
      statstmparray[0] = row.fields.Discord_user;
    }
    if(row.fields.Github_stars > statstmparray[1]){
      statstmparray[1] = row.fields.Github_stars;
    }
    if(row.fields.Twitter_follower > statstmparray[2]){
      statstmparray[2] = row.fields.Twitter_follower;
    }
  });
  rows.records.forEach((row,index) => {
    if(row.fields.Votes > 0 && sortboosted){
      const score = ((row.fields.Discord_user/statstmparray[0]) + (row.fields.Github_stars/statstmparray[1]) + (row.fields.Twitter_follower/statstmparray[2])) * 10000;
      newarray.push([row.fields.Name,Math.round(score),row.id,row.fields.Votes,row.fields.Category,row.fields.Logo[0].thumbnails.small.url]);
    }else if(!sortboosted){
      const score = ((row.fields.Discord_user/statstmparray[0]) + (row.fields.Github_stars/statstmparray[1]) + (row.fields.Twitter_follower/statstmparray[2])) * 10000;
      newarray.push([row.fields.Name,Math.round(score),row.id,row.fields.Votes,row.fields.Category,row.fields.Logo[0].thumbnails.small.url]);
    }
  });
  newarray.sort(sortFunction);
  newarray.reverse();
  setSortboosted(!sortboosted);
  setRowsSort(newarray);
  console.log("sort");
};
*/
const sortFunction = (a: any, b: any) => {
  if (a[1] === b[1]) {
      return 0;
  }
  else {
      return (a[1] < b[1]) ? -1 : 1;
  }
};

  /* Boost feature that will be added soon
  <Row>
    <span>{row[0]} {Number(row[3]) > 0 ? <span><Image src={_StarsIcon} className={classes.nogglesIcon}/></span> : ""}</span>
  </Row>
  <Col>
          <p>
          
          <span><input type="checkbox" onChange={sortlistByBoosted}></input> Show only boosted 
          <OverlayTrigger
                trigger="hover"
                placement="top"
                overlay={
                  <Popover>
                    <div style={{ padding: '0.25rem' }}>
                      <Trans>Social noun holders can boost protocols</Trans>
                    </div>
                  </Popover>
                }
              >
                <Image
                  style={{ margin: '0 0 .25rem .25rem' }}
                  src={InfoIcon}
                  className={classes.voteIcon}
                />
            </OverlayTrigger>
            </span>
          </p>
          </Col>
  */

  return (
    <>
      <Container fluid="lg">
        <Row>
          <Col lg={10} className={classes.headerRow}>
            <span>
              <Trans>Explore</Trans>
            </span>
            <h1>
              <Trans>Top Decentralized Social Media</Trans>
            </h1>
            <p>
              <Trans>
              40 dapps/protocols related to social media. We gave every dapp/protocol a "popularity" score: <br /> ((github stars / max github stars + discord user / max discord user + twitter follower / max twitter follower) * 10000)<br />
              This list is maintained by Social Nouns.
              </Trans>
            </p>
          </Col>
        </Row>
        <Row>
          
        </Row>
        <Row>
        <Col className={classes.tabelRankTitle}>
            <span>
                <Trans>#</Trans>
            </span>
          </Col>
          <Col className={classes.tabelHeaderTitle}>
            <span>
                <Trans>Name</Trans>
            </span>
          </Col>
          <Col className={classes.tabelScoreTitle} onClick={sortlist}>
            <span  className={classes.tabelScoreTitleText}>
                <Trans>Score</Trans>
            </span>
            {sortalpha ? (sortnumor ? <FontAwesomeIcon icon={faArrowAltCircleDown}/> : <FontAwesomeIcon icon={faArrowAltCircleUp}/>) : <></>}
          </Col>
        </Row>
        {
          rowssort.map((row,index) => {return (
            <div className={clsx(classes.proposalLink, classes.proposalLinkWithCountdown)} onClick={() => history.push(`/dapp/${row[0]}/${row[2]}`)} key={index} >
                  <div className={classes.proposalInfoWrapper}>
                  <span className={classes.proposalId}>{i18n.number(parseInt((index +1).toString() || '0'))}</span>{' '}
                  <div className={classes.imgWrapper}><Image src={row[5] ? row[5] : ""} alt="noun" className={classes.nounImg} ></Image></div>
                    <span className={classes.proposalTitle}>
                      <Row>
                        <span>{row[0]}</span>
                      </Row>
                      <Row>
                        <span className={classes.proposalCategory}>{row[4]}</span>
                      </Row>
                    </span>
                    
                    <span className={classes.proposalScore}>
                      <span>{row[1]}</span>
                    </span>
                    <div className={clsx(classes.proposalStatusWrapper, classes.votePillWrapper)}>
                    </div>    
                  </div>
                  
          </div>
          )})
        }
        <br />
        <Row>
          <h3>
            What is the purpose of social nouns analytics?
          </h3>
        </Row>
        <Row>
          <span>
          Our website provides Web3 social media analytics for popular dapps and protocols.<br />
          With our site, you can easily compare and contrast the performance of different dapps and protocols, allowing you to make informed decisions.<br />
          Our site offers detailed analytics, insights and soon real-time updates and alerts. Whether you're a social media influencer or a business owner, this Web3 analytics is the perfect tool for you.<br />
          Start exploring the world of Web3 social media with social nouns.
          </span>
        </Row>
      </Container>
    </>
  );
};
export default Analytics;
