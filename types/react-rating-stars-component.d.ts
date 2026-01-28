declare module 'react-rating-stars-component' {
    import { Component } from 'react';

    interface ReactStarsProps {
        count?: number;
        onChange?: (newRating: number) => void;
        size?: number;
        activeColor?: string;
        color?: string;
        value?: number;
        isHalf?: boolean;
        edit?: boolean;
        char?: string;
        classNames?: string;
    }

    export default class ReactStars extends Component<ReactStarsProps> { }
}
