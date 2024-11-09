import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './CardGroup.module.css';
import { Navigation } from 'swiper/modules';

const { Meta } = Card;


export default function CardGroup(props) {
  const { cardinfos, cols = 3 } = props;
  const rows = Math.ceil(cardinfos.length / cols);
  const cardWidth = Math.floor(24 / cols)-2;
  // console.log("卡片数量：" + cardinfos.length + "  列数：" + cols + "  行数：" + rows + "  卡片宽度：" + cardWidth)

  const cardItems = cardinfos.map((cardinfo, index) => {
    const { img, title, description, address } = cardinfo;
    return (
      <Card
        hoverable
        key={index}
        className={styles.card}
        cover={<img alt={img.alt} src={img.src} />}

      >

        <Meta
          title={<Link to={address}>{title}</Link>}
          description={<>
            {description.map((desc, index) => { 
              return <>{desc}<br /></>;
            })
          }
          </>}

        />


      </Card>

    );
  });

  const cardGroup = [];
  for (let i = 0; i < rows; i++) {
    const col = cardItems.slice(i * cols, i * cols + cols);
    const colItems = col.map((item, index) => {
      return (
        <Col key={index} span={cardWidth}>
          {item}
        </Col>
        );
    });
    cardGroup.push(
      <Row span={6} key={i} justify="center" align="top"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>
        {colItems}
      </Row>
    );
  }

  return (<>
    <div className={styles.cardWrapper}>
      {cardGroup}
    </div>
  </>);

}

export function CardItems(props) {
  const { cardinfos, idx=0} = props;
  const cardItems = cardinfos.map((cardinfo, index) => {
    const { img, title, description, address } = cardinfo;
    return (
      <Card
        hoverable
        key={index}
        className={styles.card}
        cover={<img alt={img.alt} src={img.src} />}

      >
        <Meta
          title={<Link to={address}>{title}</Link>}
          description={<>
            {description.map((desc, index) => { 
              return <>{desc}<br /></>;
            })
          }
          </>}
        />
      </Card>
    );
  });
  let chosencard;
  if (typeof idx === 'number') {
    chosencard = cardItems[idx];
  }
  else if (Array.isArray(idx) && idx.every(item => typeof item === 'number')) { 
    chosencard = idx.map(i => cardItems[i]).filter(Boolean); //过滤掉可能的 undefined 值。
  }
  return (
    <>
      {Array.isArray(chosencard) ? chosencard : [chosencard]} {/* 返回一个数组以便于渲染 */}
    </>
  );
}

export function CardItemSlider(props) {
  const { cardinfos, idx=0, slidesPerView=1} = props;
  const cardItems = cardinfos.map((cardinfo, index) => {
    const { img, title, description, address } = cardinfo;
    return (
      <Card
        hoverable
        key={index}
        className={styles.card}
        cover={<img alt={img.alt} src={img.src} />}

      >
        <Meta
          title={<Link to={address}>{title}</Link>}
          description={<>
            {description.map((desc, index) => { 
              return <>{desc}<br /></>;
            })
          }
          </>}
        />
      </Card>
    );
  });
  let chosencard;
  if (typeof idx === 'number') {
    chosencard = <SwiperSlide>{cardItems[idx]}</SwiperSlide>;
  }
  else if (Array.isArray(idx) && idx.every(item => typeof item === 'number')) { 
    chosencard = idx.map(i => <SwiperSlide>{cardItems[i]}</SwiperSlide>).filter(Boolean); //过滤掉可能的 undefined 值。
  }

  const [slidesPerViewAdjusted, setSlidesPerViewAdjusted] = useState(slidesPerView);
  useEffect(() => {
    const handleResize = () => { 
      const swiper = document.getElementById('card-slider');
      if (swiper) { 
        console.log("swiper width: " + swiper.offsetWidth + "  slidesPerView: " + slidesPerViewAdjusted + "  card width: " + (swiper.offsetWidth / 300));
        if (swiper.offsetWidth / 300 < slidesPerViewAdjusted && slidesPerViewAdjusted > 1) {
          console.log('减小 slidesPerView');
          setSlidesPerViewAdjusted(slidesPerViewAdjusted - 1);
        }
        else if (swiper.offsetWidth / 300 > slidesPerViewAdjusted + 1 && slidesPerViewAdjusted < 3) {
          console.log('增加 slidesPerView');
          setSlidesPerViewAdjusted(slidesPerViewAdjusted + 1);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // setSlidesPerViewAdjusted(slidesPerView);
  }, [slidesPerView, slidesPerViewAdjusted]);

  return (<>
    <Swiper
        id='card-slider'
        slidesPerView={slidesPerViewAdjusted}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        style={{ width: '100%' }}
      >
      {chosencard}
      </Swiper>
    </>
  );
}
