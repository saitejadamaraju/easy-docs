import {create} from 'zustand';


const useAppstore = create((set) => ({
	authUser: JSON.parse(localStorage.getItem("doc-user")) || null ,
	setAuthUser: (authUser) => set({ authUser }),
	isShareSelected:false,
	setIsShareSelected:(isShareSelected) => set({isShareSelected}),
	currentDocId:null,
	setCurrentDocId:(currentDocId) => set({currentDocId}),
	isModifySelected:false,
	setIsModifySelected:(isModifySelected) => set({isModifySelected}),
	selectedDocument:null,
	setSelectedDocument:(selectedDocument) => set({selectedDocument}),
	documents:null,
	setdocuments:(documents) => set({documents}),
})
)

export default useAppstore;