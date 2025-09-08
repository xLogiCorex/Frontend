import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: { 
        flex: 1, 
        backgroundColor: '#f6f7fb' 
    },
    sectionTitle: { 
        fontSize: 16, 
        fontWeight: '600', 
        marginTop: 12, 
        marginLeft: 12 
    },
    dropdown: { 
        minHeight: 56, 
        justifyContent: 'center' 
    },
    pill: { 
        paddingHorizontal: 12, 
        paddingVertical: 8, 
        borderRadius: 999, 
        borderWidth: 1, 
        borderColor: '#e5e7eb', 
        backgroundColor: '#fff' 
    },
    pillActive: { 
        backgroundColor: '#0ea5e9', 
        borderColor: '#0ea5e9' 
    },
    pillText: { 
        fontSize: 14 
    },
    pillTextActive: { 
        color: '#fff', 
        fontWeight: '700' 
    },
    empty: { 
        textAlign: 'center', 
        color: '#6b7280', 
        marginTop: 20 
    },
    footer: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 14, 
        backgroundColor: '#fff', 
        borderTopWidth: 1, 
        borderColor: '#e5e7eb'
    },
    totalLabel: { 
        color: '#6b7280', 
        fontSize: 12 
    },
    totalValue: { 
        fontSize: 18, 
        fontWeight: '700' 
    },
    saveBtn: { 
        backgroundColor: '#22c55e', 
        paddingHorizontal: 22, 
        paddingVertical: 12, 
        borderRadius: 10 },
    saveText: { 
        color: '#fff', 
        fontWeight: '700' 
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
        alignItems: 'center', 
        gap: 10 
    },
    name: { 
        fontSize: 14, 
        fontWeight: '600' 
    },
    meta: { 
        color: '#6b7280', 
        marginTop: 2 
    },
    price: { 
        marginTop: 4, 
        fontWeight: '700' 
    },
    qtyWrap: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6 
    },
    btn: { 
        width: 36, 
        height: 36, 
        borderRadius: 8, 
        backgroundColor: '#f3f4f6', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#e5e7eb' 
    },
    btnText: { 
        fontSize: 20, 
        fontWeight: '700' 
    },
    input: { 
        width: 56, 
        height: 36, 
        textAlign: 'center', 
        borderWidth: 1, 
        borderColor: '#e5e7eb', 
        borderRadius: 8, 
        backgroundColor: '#fff' 
    },
});