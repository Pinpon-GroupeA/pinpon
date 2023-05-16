import Svg, { Circle } from "react-native-svg"
import Colors from "../../constants/colors"

const DroneSymbole = () => {
    return (
        <Svg height="50" width="50" fill="none" viewBox="0 0 100 100" >
            <Circle cx="20" cy="20" r="20" stroke="white" strokeWidth="2" fill={Colors.BLUE} />
        </Svg>
    )
}

export default DroneSymbole;