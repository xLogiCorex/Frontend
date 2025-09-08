import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: { 
        flex: 1, 
        backgroundColor: '#f6f7fb' 
    },
    center: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    header: { 
        backgroundColor: '#fff', 
        margin: 12, 
        padding: 14, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#e5e7eb' 
    },
    title: { 
        fontWeight: '800', 
        fontSize: 16 
    },
    subtitle: { 
        marginTop: 4 
    },
    meta: { 
        marginTop: 6, 
        color: '#6b7280', 
        fontSize: 12 
    },
    row: { 
        backgroundColor: '#fff', 
        marginHorizontal: 12, 
        marginTop: 10, 
        padding: 12, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#e5e7eb', 
        flexDirection: 'row', 
        gap: 10 
    },
    pname: { 
        fontWeight: '600' 
    },
    pmeta: { 
        color: '#6b7280', 
        marginTop: 2 
    },
    price: { 
        fontWeight: '700', 
        textAlign: 'right' 
    },
    totalRow: { 
        textAlign: 'right', 
        marginTop: 6 
    },
    footer: { 
        margin: 12, 
        backgroundColor: '#fff', 
        padding: 14, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#e5e7eb', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    },
    totalLabel: { 
        color: '#6b7280' 
    },
    totalValue: { 
        fontSize: 18, 
        fontWeight: '800' 
    },
});
