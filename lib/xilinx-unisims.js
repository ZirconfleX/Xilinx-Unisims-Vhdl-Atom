'use babel';

import XilinxUnisimsView from './xilinx-unisims-view';
import { CompositeDisposable } from 'atom';

export default {

  XilinxUnisimsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.XilinxUnisimsView = new XilinxUnisimsView(state.XilinxUnisimsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.XilinxUnisimsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'xilinx-unisims:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.XilinxUnisimsView.destroy();
  },

  serialize() {
    return {
      XilinxUnisimsViewState: this.XilinxUnisimsView.serialize()
    };
  },

  toggle() {
    console.log('XilinxUnisims was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
