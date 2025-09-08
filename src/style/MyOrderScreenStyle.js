import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: { 
        flex: 1, 
        backgroundColor: '#f6f7fb' 
    },
    card: { 
        backgroundColor: '#fff', 
        marginHorizontal: 12, 
        marginTop: 10, 
        padding: 14, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#e5e7eb', 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    title: { 
        fontWeight: '700' 
    },
    subtitle: { 
        marginTop: 4 
    },
    meta: { 
        marginTop: 4, 
        color: '#6b7280', 
        fontSize: 12 
    },
    empty: { 
        textAlign: 'center', 
        marginTop: 24, 
        color: '#6b7280' 
    },
    badge: { 
        paddingHorizontal: 10, 
        paddingVertical: 6, 
        borderRadius: 999 
    },
    badgeText: { 
        color: 'white', 
        fontWeight: '700', 
        textTransform: 'capitalize' 
    },
    fab: { 
        position: 'absolute', 
        right: 18, 
        bottom: 24, 
        backgroundColor: '#0ea5e9', 
        width: 56, height: 56, 
        borderRadius: 28, 
        alignItems: 'center', 
        justifyContent: 'center', 
        elevation: 4 
    },
    fabText: { 
        color: '#fff', 
        fontSize: 28, 
        marginTop: -2 
    },
    center: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
});
