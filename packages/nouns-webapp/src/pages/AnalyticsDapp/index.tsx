import {
  Container,
  Col,
  Image,
  Row,
} from 'react-bootstrap';
import classes from './Analytics.module.css';
import React, { useState, useEffect } from 'react';
import { Trans } from '@lingui/macro';
import { useUserNounTokenBalance } from '../../wrappers/nounToken';
//import { useEthers } from '@usedapp/core';
//import Gun from 'gun/gun';

//const EC = require('elliptic').ec;

interface AuctionPageProps {
  dappName?: string;
  id?: string;
}

interface MyObj {
  id: string,createdTime: string,fields: {Github_stars: number,Fork_number: number,Discord_user: number,Name: string,About: string,Logo: [{url: string}],SocialMediaLink: string,Website: string,Twitter_follower: number};
}
/*
const isHex = (maybeHex : string) => maybeHex.length !== 0 && maybeHex.length % 2 === 0 && !/[^a-fA-F0-9]/u.test(maybeHex);

function arrayToBase64Url(array: []) {
  return btoa(String.fromCharCode.apply(null, array)).replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const hexToUint8Array = (hexString: string) => {
  if (!isHex(hexString)) {
    throw new Error('Not a hex string');
  }
  const a = hexString?.match(/.{1,2}/g);
  const b : Array<number> = a?.map((byte: string) => parseInt(byte, 16))!;
  return Uint8Array.from(b);
};

function keyPairFromHash(hash: ArrayBufferLike) {
  const ec = new EC('p256');
  const keyPair = ec.keyFromPrivate(new Uint8Array(hash));

  let privKey = keyPair.getPrivate().toArray('be', 32);
  let x = keyPair.getPublic().getX().toArray('be', 32);
  let y = keyPair.getPublic().getY().toArray('be', 32);

  privKey = arrayToBase64Url(privKey);
  x = arrayToBase64Url(x);
  y = arrayToBase64Url(y);

  const kp = { pub: `${x}.${y}`, priv: privKey };
  return kp;
}
*/


const AnalyticsDapp: React.FC<AuctionPageProps> = props => {
  const { dappName } = props;
  const [data, setData] = useState({} as MyObj);
  const { id } = props;
 // const { account } = useEthers();
 // const { library } = useEthers();

  //const connectedAccountNounVotes = useUserVotes() || 0;

  //const hasNounVotes = account !== undefined && connectedAccountNounVotes > 0;

  console.log("Tokenbalance: " + useUserNounTokenBalance());
  
  /*
  async function ethereumLogin() {
    console.log("ETH");
    const signer = library?.getSigner();
    if (account != null) {
      const message =
        "I'm trusting this application with an irrevocable access key to my Iris account.";
      const signature = await signer?.signMessage(message);
      const signatureBytes = hexToUint8Array(signature?.substring(2)!);
      const hash1 = await window.crypto.subtle.digest('SHA-256', signatureBytes);
      const hash2 = await window.crypto.subtle.digest('SHA-256', hash1);
      const signingKey = keyPairFromHash(hash1);
      const encryptionKey = keyPairFromHash(hash2);
      const k = {
        pub: signingKey.pub,
        priv: signingKey.priv,
        epub: encryptionKey.pub,
        epriv: encryptionKey.priv,
      };
      const gun = Gun(window.location.origin + '/gun');
      const u = gun.user();
      u.auth(k);
      u.put({epub: k.epub});
      console.log("Gun: ");
      /*setTimeout(async () => {
        iris
          .public()
          .get('profile')
          .get('name')
          .once((existingName) => {
            if (typeof existingName !== 'string' || existingName === '') {
              name = name || iris.util.generateName();
              iris.public().get('profile').put({ a: null });
              iris.public().get('profile').get('name').put(name);
            }
          });
      }, 2000);
    }
  }*/

  useEffect(() => {
    async function getData() {

      const aa =('Bearer ' +  process.env.REACT_APP_AIRTABLE).toString();
      const options = {
        method: 'GET',
        headers: {
        'Authorization': aa,
        }
      };
      const URL = " https://api.airtable.com/v0/app8zZBt6vrbccHJL/Web3/" + id;
      const response2 = await fetch(URL,options);
      const json2 = await response2.json();
      const response2o: MyObj = json2; 
      if(response2o !== null){
        setData(response2o);
    }
  }
  getData();
  return () => {};
  }, [id]);
  //Part of boosting feature that will work soon
  /*
  <Row>
              {
                hasNounVotes ?
                ( 
                <Button className={classes.generateBtn} onClick={() => ethereumLogin()}>
                  <Trans>Boost {dappName}!</Trans>
                </Button>
                )
                :
                (
                <Button className={classes.generateBtnDisabled} >
                  <Trans>Bost {dappName}!</Trans>
                </Button>
                )
              }
            
            </Row>
              */
  try{
  return (
    <>
      <Container fluid="lg">
        <Row>
          <Col lg={10} className={classes.headerRow}>
            <span>
              <Trans>Explore</Trans>
            </span>
            <h1>
              {dappName}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <h3>
                About
              </h3>
            </Row>
            <Row>
              <span>
                  {data.fields ? data.fields.About: "loading ..."}
              </span>
            </Row>
            
          </Col>
          <Col>
              <div className={`${classes.imgWrapper}`}><Image src={data.fields ? data.fields.Logo[0].url : ""} alt="noun" className={classes.nounImg} ></Image></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <h3>
                Links
              </h3>
            </Row>
            <Row>
            <a href={data.fields ? data.fields.SocialMediaLink : "#/"}>
              {data.fields ? data.fields.SocialMediaLink : "loading ..."}
            </a>
            </Row>
            <Row>
            <a href={data.fields ? data.fields.Website : "#/"}>
              {data.fields ? data.fields.Website: "loading ..."}
            </a>
            </Row>
          </Col>
          <Col>
            <Row>
              <h3>
                Exposure
              </h3>
            </Row>
            <Row>
            <span>
              Twitter Follower: {data.fields ? data.fields.Twitter_follower: "loading ..."}
            </span>
            </Row>
            <Row>
            <span>
              Github Stars: {data.fields ? data.fields.Github_stars: "loading ..."}
            </span>
            </Row>
            <Row>
            <span>
              Github Forks: {data.fields ? data.fields.Fork_number: "loading ..."}
            </span>
            </Row>
            <Row>
            <span>
              Discord: {data.fields ? data.fields.Discord_user: "loading ..."}
            </span>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );}catch (e){
    return (<></>);
  }
};
export default AnalyticsDapp;
