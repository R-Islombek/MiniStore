import Hero from '../../components/Hero/Hero';
import Deliver from '../../components/Deliver/Deliver';
import ComponentsCard from "../../components/ComponentsCard/ComponentsCard";
import Sales from '../../components/Sales/Sales';
import Latest from '../../components/Latest/Latest';
const Home = () => {
    return (
        <div>
            <Hero />
            <Deliver />
            <ComponentsCard />
            <Sales />
            <Latest />  
        </div>
    )
}

export default Home
