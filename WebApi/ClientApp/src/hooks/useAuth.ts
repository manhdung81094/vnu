import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
    const { user } = useAppSelector(x => x.auth)
    return {
        user
    };
}