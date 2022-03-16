import { useContext , useEffect , useState } from 'react';
import CardContext from '../../Store/card-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
const[btnIsHighLighted,setBtnIsHighLighted] =useState(false);
const cartCtx = useContext(CardContext);

const { items } = cartCtx;

const numberOfCartItems = items.reduce((curNumber,item) => {

    return curNumber + item.amount;
} , 0);
   
    const btnClasses = `${styles.button} ${btnIsHighLighted ? styles.bump : '' }` ;
    useEffect(() =>{
        if(items.length === 0){
            return;
        }
        setBtnIsHighLighted(true);
       const timer = setTimeout(() => {
            setBtnIsHighLighted(false);
        },300);

        return () =>{
            clearTimeout(timer);
        }
    },[items]);
    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
}
export default HeaderCartButton;