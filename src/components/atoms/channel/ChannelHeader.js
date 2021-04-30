import { ButtonDestructive } from '../../../Design'
import ChannelSkeleton from '../../skeletons/ChannelSkeleton'

// ChannelHeader component, renders user's avatar and name. Optionally contains
// button to allow them to delete their profile.
export default function ChannelHeader(props) {
    if (props.name) {
        return (
            <div className="relative bg-black bg-opacity-40 rounded-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center relative p-8 z-10 bg-opacity-40 bg-black">
                    <div className="flex flex-col lg:flex-row items-center flex-auto">
                        {
                            props.avatar ?
                            <img 
                                className="flex-initial flex-shrink-0 rounded-full overflow-hidden bg-gray-200 h-32 w-32 shadow-lg lg:mr-8" 
                                src={`data:image/jpeg;base64,${props.avatar}`} 
                                alt={props.name + " avatar"} />
                            :
                            <span className="block flex-initial flex-shrink-0 rounded-full overflow-hidden bg-primary-200 dark:bg-primary-800 h-32 w-32 shadow-lg lg:mr-8"/>
                        }
                        <div className="flex-auto text-center lg:text-left">
                            <h1 className="font-bold font-header text-white text-3xl mt-4 lg:my-0">
                                {props.name}
                            </h1>
                            {
                                props.isDestroyable &&
                                <button onClick={props.destroyModal} className={ButtonDestructive + " mt-2"}>
                                    Delete my data
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <img 
                    className="absolute inset-0 bg-gray-100 dark:bg-gray-900 w-full transform -translate-y-1/2" 
                    style={{ filter: 'blur(100px)' }}
                    src={`data:image/jpeg;base64,${props.avatar}`}
                    alt=""/>
            </div>
        )
    } else {
        return (
            <ChannelSkeleton/>
        )
    }
}