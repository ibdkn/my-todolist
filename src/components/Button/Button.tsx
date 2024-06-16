type ButtonPropsType = {
    title: string
    className?: string
    onClick: () => void
};
export const Button = ({title, className, onClick}: ButtonPropsType) => {
    const onClickHandler = () => {
        onClick();
    }
    return (
        <button className={className} onClick={onClickHandler}>{title}</button>
    );
};