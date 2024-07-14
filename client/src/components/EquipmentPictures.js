import { Carousel, Image } from 'antd';

const isJson = (text) => {
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

const EquipmentPictures = ({ pictures, maxWidth = "30vw" }) => {
    let picturesIsJson = isJson(pictures);
    let picturesObj = pictures;
    if (picturesIsJson) {
        picturesObj = JSON.parse(pictures);
    }

    return (
        <div style={{maxWidth: maxWidth}}>
            <Carousel arrows infinite={false} adaptiveHeight>
                {
                    !pictures || pictures.length == 0 || (picturesIsJson && picturesObj.length == 0)
                        ? // there are no pictures (undefined, empty string, or empty array (json))
                        <div style={
                            {
                                height: '160px',
                                color: '#fff',
                                lineHeight: '160px',
                                textAlign: 'center',
                                background: '#364d79',
                            }
                        }>
                            No Equipment Image
                        </div>
                        : // there are pictures
                        (picturesIsJson
                            ? // json structure ([{name: "", data: ""}])
                            picturesObj.map(pic => {
                                return <div key={pic.name}>
                                    <Image src={pic.data} alt={pic.name} /></div>
                            })
                            : // non-json (http(s)://...)
                            <div>
                                <Image src={pictures} />
                            </div>
                        )
                }
            </Carousel>
        </div>
    );
}

export default EquipmentPictures;