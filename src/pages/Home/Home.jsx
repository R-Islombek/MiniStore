import Hero from '../../components/Hero/Hero';
import Deliver from '../../components/Deliver/Deliver';
import ComponentsCard from "../../components/ComponentsCard/ComponentsCard";
import Sales from '../../components/Sales/Sales';
import Latests from '../../components/Latest/Latests';
import Slider from '../../components/Slider/Slider';

const Home = () => {
    return (
        <div>
            <Hero />
            <Deliver />
            <ComponentsCard />
            <Sales />
            <Latests />  
            <Slider />
        </div>
    )
}

export default Home
