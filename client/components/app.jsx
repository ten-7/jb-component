import React from 'react';
import Carousel from './carousel.jsx';
import axios from 'axios';
import Slider from 'react-slick';
import './styles.css';
import Paper from '@material-ui/core/Paper';

const ec2address = 'http://ec2-3-19-29-97.us-east-2.compute.amazonaws.com'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            currentId: 0,
            currentTag: 'war',
            axes: [
                {
                    name: 'fighty axe',
                    tag: 'battle',
                    images: [`https://s3.us-east-2.amazonaws.com/axes/battle+axe/1.+battle-axe.jpg`],
                    id: 1
                }
            ]
        }
        this.findTagFromId = this.findTagFromId.bind(this);
    };

    componentDidMount() {
        axios.get(`${ec2address}/api/carousel/products`)
        .then(results => {
            const tagArr = [];
            const tagObj = {};
            for (let obj of results.data) {
                if (tagObj[obj.tag] === undefined) {
                    tagArr.push(obj.tag);
                    tagObj[obj.tag] = 1;
                }
            }
            this.setState({
                tags: tagArr,
                axes: results.data
            });
        })
        window.addEventListener('productId', (e) => {
            let newTag = this.findTagFromId(e.detail);
            this.setState({
                currentId: e.detail,
                currentTag: newTag
            })
        })
    };

    handleProductClick(e, id, tag) {
        e.preventDefault();
        
        this.setState({
            currentId: id,
            currentTag: tag
        }, (err, res) => {
            window.dispatchEvent(new CustomEvent('productId', {"detail": this.state.currentId}))
        });
    }

    findallAxesFromTag(tag) {
        const axes = this.state.axes
        const taggedAxes = [];
        for (let i =0 ; i < axes.length; i++) {
            if (axes[i].tag === tag) {
                taggedAxes.push(axes[i]);
            }
        }

        return taggedAxes
    };

    findTagFromId(id) {
        for (let obj of this.state.axes) {
            if (obj.productId === id) {
                return obj.tag;
            }
        }
    }
    

    render() {

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: true
          
        };
        return (
        <Paper id = 'paperCarousel'>
            <div id = 'CarouselContainer'>
                <div>
                    
                    <div className='carousel_Container'>
                        <Slider {...settings}>
                            {this.findallAxesFromTag(this.state.currentTag).map((axe, index) => {
                                if (this.state.currentId !== axe.productId) {
                                    return <Carousel axe = {axe} key = {index} handleProductClick = {this.handleProductClick.bind(this)}/>
                                }   
                            })}
                        </Slider>
                    </div>
                    
                </div>
            </div>
        </Paper>
        )
    }
}

export default App;


//homemade carousel
/*
<div>
                        <input id = 'leftCarouselButton' onClick = {(e) => {this.handleLeftCarouselClick(e)}} type = 'submit' name ='lbutton' value = 'lbutton'/>
                    </div>
                    <div id = 'carousel'>
                        {this.findallAxesFromTag(this.state.currentTag).map((axe, index) => {
                            if (index >= this.state.carouselBegin && index < this.state.carouselEnd && this.state.currentId !== axe.id) {
                                return <Carousel axe = {axe} key = {index} handleProductClick = {this.handleProductClick.bind(this)}/>
                            }   
                        })}
                    </div>
                    <div>
                        <input onClick = {(e) => {this.handleRightCarouselClick(e)}} type = 'submit' name ='rbutton' value = 'rbutton'/>
                    </div>
*/